/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';

type RootProps = {
  children?: React.ReactNode;
  dialogs?: React.ReactNode;
};

export const Root: React.FC<RootProps> = (symbolProps) => {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      {[symbolProps.children, symbolProps.dialogs]}
    </div>
  );
};
