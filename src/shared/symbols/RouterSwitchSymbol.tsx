/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { Switch } from 'react-router-dom';

type RouterSwitchSymbolProps = {
  routes?: React.ReactNode;
  redirects?: React.ReactNode;
};

export const RouterSwitchSymbol: React.FC<RouterSwitchSymbolProps> = (
  symbolProps,
) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 1 0%',
        flexDirection: 'column',
        height: '100%',
        borderColor: '#8cc90c',
      }}
    >
      <Switch>{[symbolProps.routes, symbolProps.redirects]}</Switch>
    </div>
  );
};
