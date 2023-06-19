/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { ErrorPagePage, NotFoundPagePage, LayoutImagePage } from 'pages';
import { GlobalDialogImageComponent } from 'dialogs';
import {
  Root,
  RootLayoutsContainer,
  BaseLayout,
  RouterSwitchSymbol,
  BasePageLayout,
} from 'shared/symbols';
import { RouteHook, Box } from 'shared/components';
import { useGlobalState } from 'providers';

export const RootContent: React.FC = ({ props }) => {
  const { uncaughtErrors, GlobalDialogImage } = useGlobalState();

  return (
    <Root dialogs={<GlobalDialogImageComponent />}>
      <RootLayoutsContainer
        layouts={
          <Fragment>
            <BaseLayout
              content={
                <RouterSwitchSymbol
                  routes={
                    <Fragment>
                      <RouteHook path={['/500']} authAccess="any" exact={true}>
                        <ErrorPagePage />
                      </RouteHook>
                      <RouteHook path={['/404']} authAccess="any" exact={true}>
                        <NotFoundPagePage />
                      </RouteHook>
                    </Fragment>
                  }
                />
              }
              path={['/500', '/404']}
            />
            <BasePageLayout
              content={
                <Box style={{ height: '100%' }}>
                  <RouterSwitchSymbol
                    routes={
                      <RouteHook
                        path={[
                          '/__layouts/__layoutimage',
                          '/',
                          '/dynamicroute/:id',
                        ]}
                        authAccess="any"
                        exact={true}
                      >
                        <LayoutImagePage />
                      </RouteHook>
                    }
                  />
                </Box>
              }
              path={['/', '/dynamicroute/:id', '/__layouts/__layoutimage']}
            />
          </Fragment>
        }
      />
    </Root>
  );
};
