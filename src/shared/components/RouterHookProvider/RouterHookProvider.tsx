import { createContext } from 'react';

import { RouteHookType, StateListDSL } from '@builder/schemas';

type GlobalHooksType = {
  beforeEach?: RouteHookType;
  afterEach?: RouteHookType;
};

type LocalHookType = {
  type?: string;
  code?: string;
  request?: string;
  function?: string;
};
type LocalHooksType = {
  beforeRouteEnter?: LocalHookType;
  beforeRouteUpdate?: LocalHookType;
  beforeRouteExit?: LocalHookType;
};

type RouteHookContextType = {
  state: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevLocation?: any;
  currentPath: string | undefined;
  nextPath: string | undefined;
  globalHooks: GlobalHooksType;
  localHooks: LocalHooksType;
  runRequest: (requestID: string) => void;
  stateList: StateListDSL;
};

export const RouteHookContext = createContext<RouteHookContextType>({
  state: {},
  nextPath: undefined,
  currentPath: undefined,
  prevLocation: undefined,
  globalHooks: {
    beforeEach: undefined,
    afterEach: undefined,
  },
  localHooks: {
    beforeRouteEnter: undefined,
    beforeRouteUpdate: undefined,
    beforeRouteExit: undefined,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  runRequest: (requestID: string) => {},
  stateList: {},
});
