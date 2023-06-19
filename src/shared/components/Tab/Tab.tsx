import React, { CSSProperties, forwardRef } from 'react';

import { SerializedStyles } from '@emotion/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  FormControlLabel,
  TabProps as MaterialTabProps,
  FormControlProps,
  FormControlLabelProps,
  Tab as MaterialPanel,
} from '@mui/material';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type TabProps = Omit<MaterialTabProps, 'ref' | 'error'> &
  ComponentDataProps &
  ComponentBasicProps &
  Pick<FormControlProps, 'variant' | 'size'> &
  Pick<FormControlLabelProps, 'label'> & {
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
    iconposition: 'bottom' | 'top' | 'end' | 'start' | undefined;
    wrapped: boolean | undefined;
    icon: string | undefined;
    header: string;
  };

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  (
    {
      disabled,
      value,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      style,
      title,
      className,
      lang,
      translate,
      wrapped,
      icon,
      iconposition,
      id,
      label,
      header,
      sx,
      ...otherTabProps
    },
    ref,
  ) => {
    let iconToshow;
    switch (icon) {
      case 'phone':
        iconToshow = <PhoneIcon />;
        break;
      case 'favorite':
        iconToshow = <FavoriteIcon />;
        break;
      case 'person':
        iconToshow = <PersonPinIcon />;
        break;
      default:
        iconToshow = undefined;
        break;
    }

    return (
      <FormControlLabel
        ref={ref}
        disableTypography
        style={style}
        label=""
        control={
          <MaterialPanel
            {...otherTabProps}
            label={label}
            style={style}
            value={value}
            id={value}
            disabled={disabled}
            icon={iconToshow}
            iconPosition={iconposition}
            wrapped={wrapped}
            className={className}
            sx={sx}
          />
        }
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        sx={{
          justifyContent: 'center',
          ...sx,
          marginLeft: '5px',
        }}
        title={title}
        className={className}
        lang={lang}
        id={id}
        translate={translate}
      />
    );
  },
);
