import React, { forwardRef, Ref } from 'react';

import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type RouterLinkProps = MuiLinkProps &
  ComponentDataProps &
  ComponentBasicProps & {
    absolute: boolean;
    to?: string;
    replace?: boolean;
  };

export const RouterLink = forwardRef(
  (
    {
      absolute = false,
      onClick,
      to = '/',
      replace = false,
      style = {},
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...rest
    }: RouterLinkProps,
    ref: Ref<HTMLAnchorElement>,
  ) => {
    const history = useHistory();

    const commonProps = {
      ...rest,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      style: {
        cursor: 'pointer',
        ...style,
      },
    };

    if (absolute) {
      return <MuiLink ref={ref} onClick={onClick} {...commonProps} />;
    }

    return (
      <MuiLink
        ref={ref}
        {...commonProps}
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          onClick?.(event);
          replace ? history.replace(to) : history.push(to);
        }}
      />
    );
  },
) as React.FC<RouterLinkProps>;
