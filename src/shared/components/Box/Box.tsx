import React, { CSSProperties, forwardRef, ReactNode } from 'react';

import { SerializedStyles } from '@emotion/react';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type BoxProps = ComponentDataProps &
  ComponentBasicProps &
  Pick<
    CSSProperties,
    | 'display'
    | 'overflow'
    | 'textOverflow'
    | 'visibility'
    | 'whiteSpace'
    | 'flexDirection'
    | 'flexWrap'
    | 'justifyContent'
    | 'alignItems'
    | 'alignContent'
    | 'order'
    | 'flex'
    | 'flexGrow'
    | 'flexShrink'
    | 'alignSelf'
    | 'color'
    | 'backgroundColor'
  > & {
    style?: CSSProperties;
    css?: SerializedStyles;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    htmlElement?: 'div' | 'footer';
    children?: ReactNode;
  };

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      style = {},
      display,
      overflow,
      textOverflow,
      visibility,
      whiteSpace,
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      alignContent,
      order,
      flex,
      flexGrow,
      flexShrink,
      alignSelf,
      color,
      backgroundColor,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      htmlElement = 'div',
      id,
      title,
      className,
      lang,
      translate,
      ...rest
    },
    ref,
  ) => {
    return React.createElement(
      htmlElement,
      {
        ref,
        ...rest,
        'data-test': dataTest,
        'data-node-id': dataNodeID,
        'data-node-render-path': dataRenderPath,
        id,
        title,
        className,
        lang,
        translate,
        style: {
          display,
          overflow,
          textOverflow,
          visibility,
          whiteSpace,
          flexDirection,
          flexWrap,
          justifyContent,
          alignItems,
          alignContent,
          order,
          flex,
          flexGrow,
          flexShrink,
          alignSelf,
          color,
          backgroundColor,
          minHeight: '36 px',
          ...style,
        },
      },
      children,
    );
  },
);
