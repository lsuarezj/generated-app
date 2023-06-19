/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { useGlobalState } from 'providers';
import { RouteLayout, Button } from 'shared/components';

export const HomePagePage: React.FC = ({ props }) => {
  const history = useHistory();
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
    >
      <Button
        onClick={(event) => {
          const url = '/dynamicroute/1';

          history.push(url);
        }}
        color="primary"
        disabled={false}
        loading={false}
        size="medium"
        variant="text"
        type="button"
      >
        Go&nbsp;to&nbsp;Page&nbsp;1
      </Button>
      <Button
        onClick={(event) => {
          const url = '/dynamicroute/2';

          history.push(url);
        }}
        color="primary"
        disabled={false}
        loading={false}
        size="medium"
        variant="text"
        type="button"
      >
        Go&nbsp;to&nbsp;Page&nbsp;2
      </Button>
      <Button
        onClick={(event) => {
          const url = '/dynamicroute/3';

          history.push(url);
        }}
        color="primary"
        disabled={false}
        loading={false}
        size="medium"
        variant="text"
        type="button"
      >
        Go&nbsp;to&nbsp;page&nbsp;3
      </Button>
      <Button
        style={{ backgroundColor: '#f01111' }}
        onClick={(event) => {
          // Your JavaScript code here
          GlobalDialogImage.open();
        }}
        color="primary"
        disabled={false}
        loading={false}
        size="medium"
        variant="text"
        type="button"
      >
        OPEN&nbsp;DIALOG
      </Button>
    </RouteLayout>
  );
};
