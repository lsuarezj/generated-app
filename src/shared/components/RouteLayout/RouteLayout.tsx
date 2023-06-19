import { forwardRef, ReactNode, CSSProperties, Ref, useEffect } from 'react';

import { SerializedStyles } from '@emotion/react';

import { ComponentDataProps } from '../types';

type RouteLayoutProps = ComponentDataProps & {
  onMount?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
  css?: SerializedStyles;
};

export const RouteLayout = forwardRef(
  (
    {
      onMount,
      children,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...rest
    }: RouteLayoutProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    useEffect(() => {
      onMount?.();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
