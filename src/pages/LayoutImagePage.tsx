/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { useAssets } from 'providers';
import { HomePagePage, DynamicRoutePage } from 'pages';
import { AppBarSymbol, RouterSwitchSymbol } from 'shared/symbols';
import { RouteLayout, Image, RouteHook, Box } from 'shared/components';
import { useGlobalState } from 'providers';

export const LayoutImagePage: React.FC = ({ props }) => {
  const history = useHistory();
  const assets = useAssets();
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
      <AppBarSymbol
        appBarProps={{
          style: {
            display: 'grid',
            justifyContent: 'center',
            backgroundColor: '#000000',
          },
          color: 'default',
          position: 'relative',
        }}
        toolbarProps={{ variant: 'regular' }}
      >
        <Image
          onClick={(event) => {
            const url = '/';

            history.push(url);
          }}
          src={assets.asset.src}
        />
        <Image src={assets.images.src} />
      </AppBarSymbol>
      <RouterSwitchSymbol
        routes={
          <Fragment>
            <RouteHook
              localStates={{ uncaughtErrors, GlobalDialogImage }}
              path={['/']}
              title=""
              metaTags={[]}
              authAccess="any"
              exact={true}
            >
              <HomePagePage />
            </RouteHook>
            <RouteHook
              localStates={{ uncaughtErrors, GlobalDialogImage }}
              path={['/dynamicroute/:id']}
              title=""
              metaTags={[]}
              authAccess="any"
              exact={true}
            >
              <DynamicRoutePage />
            </RouteHook>
          </Fragment>
        }
      />
      <Box
        style={{
          height: '56px',
          display: 'grid',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}
        htmlElement="footer"
      >
        <Image src={assets.a62d285a53681a71b4bdc8logo.src} />
      </Box>
    </RouteLayout>
  );
};
