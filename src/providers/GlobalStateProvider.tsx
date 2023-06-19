import React, { createContext, useContext } from 'react';

export type GlobalState = Record<string, any>;
const GlobalStateContext = createContext<GlobalState>({});
type GlobalStateProviderProps = { states: any; children: any };

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = (
  props: GlobalStateProviderProps,
) => {
  return (
    <GlobalStateContext.Provider value={props.states}>{props.children}</GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalState => {
  return useContext(GlobalStateContext);
};
