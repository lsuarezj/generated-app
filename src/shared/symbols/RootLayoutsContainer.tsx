/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { Switch } from 'react-router-dom';

type RootLayoutsContainerProps = {
  layouts?: React.ReactNode;
  redirects?: React.ReactNode;
};

export const RootLayoutsContainer: React.FC<RootLayoutsContainerProps> = (
  symbolProps,
) => {
  return (
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
      <Switch>{[symbolProps.layouts, symbolProps.redirects]}</Switch>
    </div>
  );
};
