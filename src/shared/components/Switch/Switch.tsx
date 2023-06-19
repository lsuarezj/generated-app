import React, { CSSProperties, forwardRef } from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  SwitchProps as MaterialSwitchProps,
  FormControlLabel,
  FormControlLabelProps,
  Switch as MaterialSwitch,
} from '@mui/material';

import { ComponentDataProps } from '../types';

export type SwitchProps = Omit<MaterialSwitchProps, 'ref' | 'error'> &
  ComponentDataProps &
  Pick<FormControlLabelProps, 'label' | 'labelPlacement'> &
  Pick<FormControlProps, 'variant' | 'size'> & {
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
  };

// why should we use such a weird styles there?
// by default Material-UI has negative marginLeft value and this component falls out its parent
// on the left side if it has the prop "size" equals to "small"
// so to avoid such weird behaviour we set marginLeft equals to "-6px"
const SMALL_SIZE_STYLES = {
  marginLeft: '-6px',
};

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      id,
      title,
      translate,
      disabled,
      className,
      style,
      css,
      error,
      helperText,
      variant,
      size,
      name,
      lang,
      checked,
      onChange,
      label: initLabel = '',
      labelPlacement = 'end',
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...otherSwitchProps
    },
    ref,
  ) => {
    const label = Array.isArray(initLabel) ? initLabel[0] : initLabel;

    return (
      <FormControl
        size={size}
        disabled={disabled}
        className={className}
        style={style}
        css={css}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        title={title}
        id={id}
        lang={lang}
        translate={translate}
      >
        <FormControlLabel
          disabled={disabled}
          label={label}
          labelPlacement={labelPlacement}
          name={name}
          disableTypography
          sx={size === 'small' ? SMALL_SIZE_STYLES : undefined}
          control={
            <MaterialSwitch
              {...otherSwitchProps}
              size={size}
              checked={checked}
              onChange={onChange}
            />
          }
        />
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);
