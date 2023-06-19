/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { RouteLayout } from 'shared/components';
import { useGlobalState } from 'providers';

export const ErrorPagePage: React.FC = ({ props }) => {
  const { uncaughtErrors, GlobalDialogImage } = useGlobalState();

  return (
    <RouteLayout
      style={{
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        flexBasis: '0%',
        flexShrink: 1,
        flexDirection: 'column',
      }}
    />
  );
};
