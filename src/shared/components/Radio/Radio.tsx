import React, { forwardRef } from 'react';

import {
  FormControlLabel,
  FormControlLabelProps,
  Radio as MaterialRadio,
  RadioProps as MaterialRadioProps,
} from '@mui/material';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type RadioProps = Omit<FormControlLabelProps, 'control'> &
  MaterialRadioProps &
  ComponentDataProps &
  ComponentBasicProps;

export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  (
    {
      disabled,
      label: initLabel,
      labelPlacement = 'end',
      value,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      style,
      id,
      title,
      className,
      lang,
      translate,
      readOnly,
      ...otherRadioProps
    },
    ref,
  ) => {
    // if we receive array of nodes here we should take only first one to avoid an error
    const label = Array.isArray(initLabel) ? initLabel[0] : initLabel;

    return (
      <FormControlLabel
        ref={ref}
        disabled={disabled}
        disableTypography
        label={label}
        labelPlacement={labelPlacement}
        value={value}
        control={<MaterialRadio readOnly={readOnly} {...otherRadioProps} sx={{ paddingLeft: 0 }} />}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        style={style}
        id={id}
        title={title}
        className={className}
        lang={lang}
        translate={translate}
        // why should we set such a weird styles there?
        // 1. by default Material-UI has negative marginLeft value and this component falls out its parent on the left side
        // so to avoid such weird behaviour we set marginLeft equals to 0
        // 2. by default Material-UI has positive marginRight value and it's cause of strange looking of overlays on the right side.
        // an HTML node looks shorter than we want so to avoid such weird behaviour we set marginRight equals to 0
        sx={{ marginLeft: 0, marginRight: 0 }}
      />
    );
  },
);
