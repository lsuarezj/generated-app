import { useCallback } from 'react';

import { matchPath, useLocation, useHistory } from 'react-router-dom';

import { APP_ROUTES } from 'shared/constants';

import { parse, Key } from 'path-to-regexp';

import { omit } from 'ramda';
import { useGlobalState } from 'providers';

export type RouteList = {
  path: string;
  title: string;
  exact?: boolean;
  strict?: boolean;
  meta: Record<string, unknown>;
  name: string;
};

export type Route = {
  path: string;
  title?: string;
  exact?: boolean;
  strict?: boolean;
  params: Record<string, unknown>;
  fragment: Record<string, unknown>;
  queryString?: Record<string, unknown>;
  meta: Record<string, unknown>;
  name: string;
};

type Routes = Route | Route[];

export type RouterReturnType = {
  list: RouteList[];
  [routeName: string]: Routes;
  currentRoute?: Route;
  navigate: (path: string | Route, params?: Record<string, string>) => void;
};

function camelize(str: string) {
  return (
    str
      // eslint-disable-next-line func-names
      .replace(/(?:^w|[A-Z]|w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/s+/g, '')
  );
}

const DEFAULT_ROUTE = {
  path: '',
  title: '',
  exact: false,
  strict: false,
  params: {},
  fragment: {},
  meta: {},
  name: '',
};

const getCurrentRouteFragments = (
  hashPath: string,
): Record<string, unknown> => {
  if (hashPath) {
    const hash = hashPath.substring(1);
    const fragments = hash.split('&').reduce((res, item) => {
      const [n, v] = item.split('=');
      return { ...res, [n]: v };
    }, {});

    return fragments;
  }

  return {};
};

const getCurrentRouteParams = (
  currentRoutePath: string,
  locationPath: string,
): Record<string, unknown> => {
  const pathSplit = locationPath.split('/');
  const params = parse(currentRoutePath)
    .map((p: string | Key, idx: number) => {
      if (typeof p !== 'string') {
        const valueKey = pathSplit[idx + 1];
        const nameParam = p.name;
        return {
          [nameParam]: valueKey,
        };
      }

      return {};
    })
    .reduce(
      (previousValue, currentValue) =>
        Object.assign(previousValue, currentValue),
      {},
    );
  return params;
};

export const useRoutes = (): RouterReturnType => {
  const location = useLocation();
  const history = useHistory();

  const { uncaughtErrors, GlobalDialogImage } = useGlobalState();

  const currentRoute =
    APP_ROUTES.find((route) =>
      matchPath(location.pathname, { path: route.path, exact: true }),
    ) || DEFAULT_ROUTE;

  const currentParams = getCurrentRouteParams(
    currentRoute.path,
    location.pathname,
  );
  const currentFragments = getCurrentRouteFragments(location.hash);

  const urlSearchQueryString = new URLSearchParams(location.search);
  const urlSearchQueryStringParams = Object.fromEntries(
    urlSearchQueryString.entries(),
  );
  const currentRouteWithParams = {
    ...currentRoute,
    params: currentParams,
    fragment: currentFragments,
    queryString: urlSearchQueryStringParams,
  };

  const pages = {
    homePage: {
      path: '/',
      beforeRouteEnter: { type: '', code: '', request: '', function: '' },
      beforeRouteUpdate: {
        type: 'code',
        code:
          "return function({from,to,state}) {\n  // type here\n  console.log('UpdatedPage')\n}",
        request: '',
        function: '',
      },
      beforeRouteExit: { type: '', code: '', request: '', function: '' },
      title: '',
      meta: {},
      name: 'homePage',
    },
    notFound: {
      path: '/404',
      beforeRouteEnter: {},
      beforeRouteUpdate: {},
      beforeRouteExit: {},
      meta: {},
      name: 'notFound',
    },
    errorPage: {
      path: '/500',
      beforeRouteEnter: {},
      beforeRouteUpdate: {},
      beforeRouteExit: {},
      meta: {},
      name: 'errorPage',
    },
    dynamicRoute: {
      path: '/dynamicroute/:id',
      beforeRouteEnter: {
        type: 'return function({from,to,state}) {\n  // type here\n}',
        code: '',
        request: '',
        function: '',
      },
      beforeRouteUpdate: {
        type: 'code',
        code:
          "return function({from,to,state}) {\n  // type here\n    console.log('UpdatedPage')\n}",
        request: '',
        function: '',
      },
      beforeRouteExit: {
        type: 'return function({from,to,state}) {\n  // type here\n}',
        code: '',
        request: '',
        function: '',
      },
      title: '',
      meta: {},
      name: 'dynamicRoute',
    },
  };

  const pagesList = APP_ROUTES.map((route) =>
    omit(['params', 'fragment'], route),
  );
  const navigate = useCallback(
    (path: string | Route, params?: Record<string, string>) => {
      const routePath = path instanceof Object ? path.path : path;
      const paramsKeys = Object.keys(params || {});
      const { nextPath, query } = paramsKeys.reduce(
        (accum, key) => {
          const isParamInPath = accum.nextPath.includes('/:' + key);
          const paramValue = params?.[key] || '';
          const next = accum.nextPath.replace(':' + key, paramValue);
          const paramsArray = [...accum.query];
          if (!isParamInPath) {
            paramsArray.push(key + '=' + paramValue);
          }

          return {
            nextPath: next,
            query: paramsArray,
          };
        },
        { nextPath: routePath, query: [] as string[] },
      );
      const pathToPush = query.length
        ? nextPath + '?' + query.join('&&')
        : nextPath;

      history.push(pathToPush);
    },
    [history],
  );
  return {
    list: pagesList,
    ...pages,
    currentRoute: currentRouteWithParams,
    navigate,
  };
};
