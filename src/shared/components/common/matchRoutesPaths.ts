import { matchPath, RouteProps } from 'react-router-dom';

type Route = Pick<RouteProps, 'path' | 'exact' | 'strict' | 'sensitive'>;

/**
 * @returns true if one of the route match pathname
 */
export const matchRoutesPaths = (pathname: string, routes: Route[]): boolean => {
  return routes.some(route => Boolean(matchPath(pathname, route)));
};
