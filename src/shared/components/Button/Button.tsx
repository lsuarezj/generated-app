import React, { CSSProperties, ElementType, forwardRef, useCallback } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';

type ButtonProps<C extends ElementType = 'button'> = MuiButtonProps<C> & {
  component?: C;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties;
  css?: SerializedStyles;
};

const CircularProgressWrapper = styled.div<ButtonProps>`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: ${props =>
    (props.color === 'primary' || props.color === 'secondary') && props.variant === 'contained'
      ? 'white'
      : 'black'};
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, onClick, ...rest }, ref) => {
    const onClickCallback = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!loading) {
          onClick && onClick(event);
        }
      },
      [loading, onClick],
    );

    return (
      <MuiButton
        {...rest}
        ref={ref}
        onClick={onClickCallback}
        css={
          loading &&
          css`
            color: transparent;
          `
        }
      >
        {children}
        {loading && (
          <CircularProgressWrapper color={rest.color} variant={rest.variant}>
            <CircularProgress color="inherit" size="1em" />
          </CircularProgressWrapper>
        )}
      </MuiButton>
    );
  },
);
