/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { RouteLayout, Button } from 'shared/components';
import { useGlobalState } from 'providers';

export const DynamicRoutePage: React.FC = ({ props }) => {
  const history = useHistory();
  const { uncaughtErrors, GlobalDialogImage } = useGlobalState();

  return (
    <RouteLayout
      style={{
        height: '100%',
        display: 'flex',
        flexGrow: '1',
        flexBasic: '0%',
        flexShrink: '1',
        flexDirection: 'column',
      }}
    >
      <Button
        onClick={(event) => {
          const url = '/dynamicroute/HolaMundo';

          history.push(url);
        }}
        color="primary"
        disabled={false}
        loading={false}
        size="medium"
        variant="text"
        type="button"
      >
        Go&nbsp;to&nbsp;Hi&nbsp;world
      </Button>
      <Button
        onClick={(event) => {
          const url = '/dynamicroute/ChaoMundo';

          history.push(url);
        }}
        color="primary"
        disabled={false}
        loading={false}
        size="medium"
        variant="text"
        type="button"
      >
        Go&nbsp;to&nbsp;bye&nbsp;world
      </Button>
    </RouteLayout>
  );
};
