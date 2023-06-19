/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ErrorBoundaryRouter from './providers/ErrorBoundaryRouter';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { css, Global, jsx, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Helmet } from 'react-helmet';
import { AppProvider } from '@8base-react/app-provider';
import { AsyncContent } from 'shared/components';
import { GlobalStateProvider, ErrorBoundaryContextProvider, AssetsProvider } from 'providers';
import { RootContent } from 'RootContent';
import 'assets/css/global.css';
import 'assets/css/media-query.css';

import { useArrayState, useOpenCloseState } from 'shared/hooks';
import { useErrorBoundary, useCatchEventErrors } from './providers/ErrorBoundaryContextProvider';
import { ErrorPagePage } from 'pages';
import { isEmpty } from 'ramda';
import { Redirect, Route, useLocation } from 'react-router-dom';
const appTheme = createTheme({
  name: 'custom',
  palette: {
    text: { primary: '#202020' },
    error: { main: '#D14646', contrastText: '#FFFFFF' },
    primary: {
      dark: '#006492',
      main: '#008DCE',
      light: '#3BB4EB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      dark: '#06816C',
      main: '#6EF1DB',
      light: '#34CCB3',
      contrastText: '#202020',
    },
    background: { paper: '#FFFFFF', default: '#FFFFFF' },
  },
  spacing: 8,
  typography: { fontSize: 14 },
} as any);

export const App: React.FC = () => {
  const location = useLocation();
  const runtimeErrors = useErrorBoundary();
  const eventErrors = useCatchEventErrors();
  const uncaughtErrors = useArrayState([{ code: '', error: '', message: '' }]);
  const GlobalDialogImage = useOpenCloseState(false);

  const apolloClientInstance = new ApolloClient({
    uri: ``,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    const globalErrors = runtimeErrors ?? eventErrors;
    if (globalErrors) {
      if (!isEmpty((uncaughtErrors as any).value[0].error)) {
        uncaughtErrors.setValue([
          ...uncaughtErrors.value,
          {
            message: globalErrors?.message,
            error: globalErrors?.name,
            code: globalErrors?.stack,
          },
        ]);
      } else {
        uncaughtErrors.setValue([
          {
            message: globalErrors?.message,
            error: globalErrors?.name,
            code: globalErrors?.stack,
          },
        ]);
      }
    }
  }, [runtimeErrors, eventErrors]);
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={appTheme}>
        <EmotionThemeProvider theme={appTheme}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <CssBaseline />
            <Helmet>
              <title>8base App</title>

              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Helmet>

            <ApolloProvider client={apolloClientInstance}>
              <GlobalStateProvider states={{ uncaughtErrors, GlobalDialogImage }}>
                <AssetsProvider>
                  {runtimeErrors || !isEmpty(eventErrors) ? (
                    <Fragment>
                      <Route path="/500">
                        <ErrorPagePage />
                      </Route>
                      <Redirect to="/500" />
                    </Fragment>
                  ) : (
                    <RootContent key={location.pathname} />
                  )}
                </AssetsProvider>
              </GlobalStateProvider>
            </ApolloProvider>
          </LocalizationProvider>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};
