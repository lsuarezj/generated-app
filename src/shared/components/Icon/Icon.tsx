import React, { CSSProperties, forwardRef, Ref } from 'react';

import { SerializedStyles } from '@emotion/react';
import * as MaterialIcons from '@mui/icons-material';

import { ComponentBasicProps, ComponentDataProps } from '../types';

type MaterialIconNames = keyof typeof MaterialIcons;

type IconProps = ComponentDataProps &
  ComponentBasicProps & {
    customIcon?: string;
    name?: MaterialIconNames | string;
    variant?: 'filled' | 'outlined' | 'rounded' | 'twoTone' | 'sharp';
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    fontSize?: 'inherit' | 'small' | 'medium' | 'large';
    htmlColor?: string;
    viewBox?: string;
    style?: CSSProperties;
    css?: SerializedStyles;
    classes?: Record<string, unknown>;
    className?: string;
  };

const capitalize = (value = ''): string => {
  const head = value[0] || '';
  const rest = value.slice(1) || '';
  return head.toUpperCase() + rest;
};

const DEFAULT_SIZE = 20;

export const Icon = forwardRef(
  (
    {
      name,
      customIcon,
      variant = 'filled',
      style,
      color,
      fontSize,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...rest
    }: IconProps,
    ref: Ref<HTMLSpanElement>,
  ) => {
    if (customIcon) {
      return (
        <span
          ref={ref}
          data-test={dataTest}
          data-node-id={dataNodeID}
          data-node-render-path={dataRenderPath}
          style={style}
        >
          <svg width={style?.width ?? DEFAULT_SIZE} height={style?.height ?? DEFAULT_SIZE}>
            <image
              href={customIcon}
              width={style?.width ?? DEFAULT_SIZE}
              height={style?.height ?? DEFAULT_SIZE}
            />
          </svg>
        </span>
      );
    }

    const importVariant = variant === 'filled' ? '' : capitalize(variant);
    const MaterialIcon = MaterialIcons[`${name}${importVariant}` as MaterialIconNames];

    if (MaterialIcon) {
      return (
        // SvgIconComponent isn't aware of its forwardRef nature for some reason
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <MaterialIcon
          ref={ref}
          data-test={dataTest}
          data-node-id={dataNodeID}
          data-node-render-path={dataRenderPath}
          fontSize={fontSize}
          color={color}
          style={style}
          {...rest}
        />
      );
    }

    return (
      <span
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        style={style}
      />
    );
  },
);
