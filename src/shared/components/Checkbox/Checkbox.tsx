import React, { CSSProperties, forwardRef } from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  CheckboxProps as MaterialCheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  Checkbox as MaterialCheckbox,
} from '@mui/material';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type CheckboxProps = Omit<MaterialCheckboxProps, 'ref' | 'error'> &
  ComponentDataProps &
  ComponentBasicProps &
  Pick<FormControlProps, 'variant' | 'size' | 'fullWidth'> &
  Pick<FormControlLabelProps, 'label' | 'labelPlacement'> & {
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
  };

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      disabled,
      label: initLabel = '',
      labelPlacement = 'end',
      className,
      style,
      css,
      error,
      helperText,
      variant,
      size,
      name,
      checked,
      onChange,
      fullWidth,
      icon: initlUncheckedIcon,
      checkedIcon: initCheckedIcon,
      indeterminateIcon: initIndeterminateIcon,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      lang,
      translate,
      ...otherSwitchProps
    },
    ref,
  ) => {
    // if we receive array of nodes here we should take only first one to avoid an error
    const uncheckedIcon = Array.isArray(initlUncheckedIcon)
      ? initlUncheckedIcon[0]
      : initlUncheckedIcon;
    const checkedIcon = Array.isArray(initCheckedIcon) ? initCheckedIcon[0] : initCheckedIcon;
    const indeterminateIcon = Array.isArray(initIndeterminateIcon)
      ? initIndeterminateIcon[0]
      : initIndeterminateIcon;
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
        fullWidth={fullWidth}
        id={id}
        title={title}
        lang={lang}
        translate={translate}
      >
        <FormControlLabel
          disabled={disabled}
          label={label}
          labelPlacement={labelPlacement}
          name={name}
          disableTypography
          control={
            <MaterialCheckbox
              {...otherSwitchProps}
              size={size}
              checked={checked}
              onChange={onChange}
              icon={uncheckedIcon}
              checkedIcon={checkedIcon}
              indeterminateIcon={indeterminateIcon}
            />
          }
        />
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);
