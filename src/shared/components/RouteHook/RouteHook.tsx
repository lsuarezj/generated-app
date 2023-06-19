import { useEffect } from 'react';
import { Route } from 'shared/components';
import { useRouterHooks } from 'shared/hooks';
import {
  RouteProps as ReactRouteProps,
} from 'react-router-dom';

type RouteProps = ReactRouteProps & {
  /**
   * `private` means route available only for authorized users
   * `public` means route available only for not-authorized users
   * `any` means route available for any users
   */
  authAccess: 'private' | 'public' | 'any';
} & { localStates?: 'any' };
const Content = props => {
  const { data } = props;
  useEffect(() => {
    data.runAfterEach();
    data.runBeforeEach();
  }, [data]);

  return <Route {...props} />;
};

export const FilterPathLayout = (path: RouteProps) => {
  return path?.some((item: string | string[]) => item.includes('/__layout'));
};

export const RouteHook = (props: RouteProps) => {
  const { waitingHooks, data } = useRouterHooks(props.path, props.localStates);

  if (FilterPathLayout(props.path as Array<string>)) {
    return <Route {...props} />;
  }

  if (waitingHooks) {
   return <Route {...props} />;
  }

  return <Content {...props} data={data} />;
};
