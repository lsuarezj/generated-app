import { useRef, useState, useEffect } from 'react';

import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { useRoutes, useBeforeEach, useAfterEach, useResources } from 'shared/hooks';

import { useGlobalState } from '../../../providers';

const HOOK_TYPES = {
  code: 'code',
  request: 'request',
  function: 'function'
} as const;

function usePrevious<T>(value: T): T {
  const ref = useRef({} as T);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const DEFAULT_HOOK_FUNCTION = 'return function({to, from, state}) {\n  // type here\n}';
const isSameRoute = (path1: string, path2: string, currentPath: string | undefined) => {
  const matchPath1 = matchPath(path1, {
    path: currentPath,
    exact: true,
  });
  const matchPath2 = matchPath(path2, {
    path: currentPath,
    exact: true,
  });
  const hasChanged = !(Boolean(matchPath1) && Boolean(matchPath2));

  return hasChanged;
};

export function useRouterHooks(path, localStates = {}) {
  const beforeEach = useBeforeEach();
  const afterEach = useAfterEach();
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const router = useRoutes();
  const resources = useResources();
  const { currentRoute } = router;
  const isCurrentRoute = !!matchPath(location.pathname, { path, exact: true });
  const [waitingHooks, setWaitingHooks] = useState(true);
  const [data, setCallback] = useState({});
  const { listen } = useHistory();
  const beforeEachFunction = new Function(beforeEach?.code || DEFAULT_HOOK_FUNCTION)();
  const afterEachFunction = new Function(afterEach?.code || DEFAULT_HOOK_FUNCTION)();
  const beforeRouteEnter = new Function(
    currentRoute?.beforeRouteEnter?.code || DEFAULT_HOOK_FUNCTION,
  )();
  const beforeRouteExit = new Function(
    currentRoute?.beforeRouteExit?.code || DEFAULT_HOOK_FUNCTION,
  )();
  const beforeRouteUpdate = new Function(
    currentRoute?.beforeRouteUpdate?.code || DEFAULT_HOOK_FUNCTION,
  )();
  const globalState = useGlobalState();
  const state = { ...globalState, router, resources, ...localStates}

  useEffect(() => {
    if (!isCurrentRoute) return;

    const hasChanged = isSameRoute(location.pathname, prevLocation?.pathname, currentRoute?.path);

    if (hasChanged) {
      setWaitingHooks(false);
      setCallback({
        runBeforeEach: () =>{
          if (beforeEach.type === HOOK_TYPES.code) {
            beforeEachFunction({ from: prevLocation, to: location, state });
          } 

          if(beforeEach.type === HOOK_TYPES.request){
            globalState[beforeEach?.requestName]?.run();
          }

          if (beforeEach.type === HOOK_TYPES.function) {
            state[beforeEach?.functionName ?? '']?.(prevLocation, location, state);
          }

          if (currentRoute.beforeRouteEnter?.type === HOOK_TYPES.code) {
            beforeRouteEnter({ from: prevLocation, to: location, state });
          } 

          if(currentRoute.beforeRouteEnter?.type === HOOK_TYPES.request){
            globalState[currentRoute.beforeRouteEnter?.request]?.run();
          }

          if (currentRoute.beforeRouteEnter?.type === HOOK_TYPES.function) {
            state[currentRoute?.beforeRouteEnter?.function ?? '']?.(prevLocation, location, state);
          }

          setWaitingHooks(true);
        },
        runAfterEach: () => {
          if (afterEach.type === HOOK_TYPES.code) {
            afterEachFunction({ from: prevLocation, to: location, state });
          }

          if(afterEach.type === HOOK_TYPES.request){
            globalState[afterEach?.requestName]?.run();
          }

          if(afterEach.type === HOOK_TYPES.function){
            state[afterEach?.functionName ?? '']?.(prevLocation, location, state);
          }
        },
      });
    }

    const unlisten = listen(locationChanged => {
      const isSamePath = matchPath(locationChanged.pathname, {
        path: currentRoute?.path,
        exact: true,
      });
      const sameRouteWithDifferentParams =
        location.pathname !== locationChanged.pathname && isSamePath;

      if (sameRouteWithDifferentParams) {
        if (currentRoute.beforeRouteUpdate?.type === HOOK_TYPES.code) {
          beforeRouteUpdate({ from: prevLocation, to: location, state });
        } 

        if(currentRoute.beforeRouteUpdate?.type === HOOK_TYPES.request){
          globalState[currentRoute.beforeRouteUpdate?.request]?.run();
        }

        if(currentRoute.beforeRouteUpdate?.type === HOOK_TYPES.function){
          state[currentRoute?.beforeRouteUpdate?.function ?? '']?.(prevLocation, location, state);
        }
      }
    });

    return () => {
      const newLocation = window.location;
      const hasChanged = isSameRoute(newLocation.pathname, location.pathname, currentRoute?.path);
      if (hasChanged) {
        if (currentRoute.beforeRouteExit?.type === HOOK_TYPES.code) {
          beforeRouteExit({ from: prevLocation, to: location, state });
        } 

        if(currentRoute.beforeRouteExit?.type === HOOK_TYPES.request){
          globalState[currentRoute.beforeRouteExit?.request]?.run();
        }

        if(currentRoute.beforeRouteExit?.type === HOOK_TYPES.function){
          state[currentRoute?.beforeRouteExit?.function ?? '']?.(prevLocation, location, state);
        }
        setWaitingHooks(true);
      }

      unlisten();
    };
  }, [location, isCurrentRoute, currentRoute, listen]);

  return { waitingHooks, data };
}
