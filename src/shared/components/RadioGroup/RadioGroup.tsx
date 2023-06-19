import React, { CSSProperties, forwardRef } from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  RadioGroupProps as MaterialRadioGroupProps,
  FormControlLabelProps,
  RadioGroup as MaterialRadioGroup,
} from '@mui/material';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type RadioGroupProps = Omit<MaterialRadioGroupProps, 'ref' | 'error'> &
  ComponentDataProps &
  ComponentBasicProps &
  Pick<FormControlProps, 'variant' | 'size'> &
  Pick<FormControlLabelProps, 'label'> & {
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
  };

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      size,
      className,
      style,
      css,
      error,
      helperText,
      variant,
      name,
      label,
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
      ...otherRadioGroupProps
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
        <MaterialRadioGroup {...otherRadioGroupProps} name={name} value={value} onChange={onChange}>
          {children}
        </MaterialRadioGroup>
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);
