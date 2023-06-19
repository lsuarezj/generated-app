import React, { CSSProperties, ElementType, forwardRef } from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  ToggleButtonProps as MuiToggleButtonProps,
  ToggleButton as MuiToggleButton,
} from '@mui/material';

type ToggleButtonProps<C extends ElementType = 'button'> = MuiToggleButtonProps<C> & {
  component?: C;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties;
  css?: SerializedStyles;
};

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ loading, children, onClick, classes, ...rest }, ref) => {
    return (
      <MuiToggleButton {...rest} classes={classes} ref={ref}>
        {children}
      </MuiToggleButton>
    );
  },
);
