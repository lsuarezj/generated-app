import { forwardRef, Ref } from 'react';

import { useAuth } from '@8base-react/auth';
import { Helmet } from 'react-helmet';
import {
  Route as ReactRoute,
  Redirect as ReactRedirect,
  RouteProps as ReactRouteProps,
} from 'react-router-dom';

export type RouteProps = ReactRouteProps & {
  /**
   * `private` means route available only for authorized users
   * `public` means route available only for not-authorized users
   * `any` means route available for any users
   */
  authAccess: 'private' | 'public' | 'any';
  title?: string;
  metaTags?: Array<{ id: string; name: string; content?: string }>;
};

export const Route = forwardRef(
  (
    { authAccess, title, metaTags = [], children, ...rest }: RouteProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { isAuthorized } = useAuth();

    if (isAuthorized && authAccess === 'public') {
      return <ReactRedirect to="/" />;
    }

    if (!isAuthorized && authAccess === 'private') {
      return <ReactRedirect to="/login" />;
    }

    return (
      <ReactRoute {...rest}>
        <Helmet>
          {title && <title>{title}</title>}
          {metaTags.map(metaTag => {
            switch (metaTag.name) {
              case 'charset': {
                return <meta charSet={metaTag.content} />;
              }

              default: {
                return <meta name={metaTag.name} content={metaTag.content} />;
              }
            }
          })}
        </Helmet>
        {children}
      </ReactRoute>
    );
  },
);
