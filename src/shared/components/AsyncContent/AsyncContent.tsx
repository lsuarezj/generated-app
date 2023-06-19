import React, { CSSProperties, forwardRef, ReactElement } from 'react';

import {
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
} from '@mui/material';

import { Box, BoxProps } from '../Box';
import { ComponentDataProps, ComponentBasicProps } from '../types';

type AsyncContentProps = ComponentDataProps &
  ComponentBasicProps & {
    style?: CSSProperties;
    stretch?: boolean;
    loading?: boolean;
    children?: ReactElement;
    boxProps?: BoxProps;
    circularProgressProps?: CircularProgressProps;
    type?: string;
    value?: number;
    color?: LinearProgressProps['color'] | CircularProgressProps['color'];
    variant?: 'determinate' | 'indeterminate';
  };

const STRETCH_PROPS = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  flexGrow: 1,
};

export const AsyncContent = forwardRef<HTMLDivElement, AsyncContentProps>(
  (
    {
      style,
      children,
      loading,
      stretch,
      boxProps = {},
      id,
      title,
      className,
      lang,
      translate,
      circularProgressProps = {},
      type,
      value,
      color,
      variant,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
    },
    ref,
  ) => {
    const stretchProps = stretch && loading ? STRETCH_PROPS : {};

    const resultBoxProps = {
      ...boxProps,
      ...stretchProps,
    };

    let content: React.ReactNode = null;
    if (loading) {
      content =
        type === 'linear' ? (
          <LinearProgress value={value} color={color} variant={variant} style={{ width: '100%' }} />
        ) : (
          <CircularProgress
            value={value}
            color={color}
            variant={variant}
            {...circularProgressProps}
          />
        );
    } else if (children) {
      content = children;
    }

    return (
      <Box
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        style={style}
        id={id}
        title={title}
        className={className}
        lang={lang}
        translate={translate}
        {...resultBoxProps}
      >
        {content}
      </Box>
    );
  },
);
