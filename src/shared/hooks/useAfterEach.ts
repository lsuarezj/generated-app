import React, { Fragment } from 'react';
import { css, SerializedStyles } from '@emotion/react';

export const useAfterEach = () => {
  return {
    name: 'AfterEachGlobalHook',
    code: 'return function({to, from, state}) {\n  // type here\n}',
    scope: 'global',
    requestName: null,
    functionName: null,
  };
};
