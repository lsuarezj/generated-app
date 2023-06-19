import React, { CSSProperties, forwardRef } from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
  ToggleButtonGroup as MuiToggleButtonGroup,
  FormControl,
  FormControlProps,
  FormHelperText,
  FormControlLabelProps,
} from '@mui/material';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type ToggleButtonProps = Omit<MuiToggleButtonGroupProps, 'ref' | 'error'> &
  ComponentDataProps &
  ComponentBasicProps &
  Pick<FormControlProps, 'variant' | 'size'> &
  Pick<FormControlLabelProps, 'label'> & {
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
  };

export const ToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonProps>(
  (
    {
      size,
      className,
      style,
      css,
      error,
      helperText,
      variant,
      value,
      onChange,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      children,
      id,
      title,
      lang,
      translate,
      color,
      classes,
      label,
      ...otherToggleGroupProps
    },
    ref,
  ) => {
    return (
      <FormControl
        size={size}
        className={className}
        style={style}
        css={css}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={id}
        title={title}
        lang={lang}
        translate={translate}
      >
        {label}
        <MuiToggleButtonGroup
          {...otherToggleGroupProps}
          size={size}
          color={color}
          classes={classes}
          value={value}
          onChange={
            onChange as ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
          }
          id={id}
          className={className}
          title={title}
          lang={lang}
          translate={translate}
        >
          {children}
        </MuiToggleButtonGroup>
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);
