/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { Route } from 'shared/components';
import { useRoutes } from 'shared/hooks';
import { Redirect } from 'react-router-dom';

type BaseLayoutProps = {
  path?: any;
  exact?: boolean;
  router?: string;
  content?: React.ReactNode;
  header?: React.ReactNode;
};

export const BaseLayout: React.FC<BaseLayoutProps> = (symbolProps) => {
  const router = useRoutes();

  if (!router.currentRoute?.path) {
    return <Redirect to="/404" />;
  }

  return (
    <Route path={symbolProps.path} exact={true} authAccess="any">
      <div
        style={{
          display: 'flex',
          flex: '1 1 0%',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {symbolProps.content}
      </div>
    </Route>
  );
};
