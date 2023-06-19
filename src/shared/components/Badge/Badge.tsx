import React, { CSSProperties, ElementType, forwardRef, useCallback } from 'react';

import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge as MuiBadge, Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

type BadgeProps<C extends ElementType = 'div'> = MuiBoxProps<C> & {
  component?: C;
  badgeContent: React.ReactNode;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties;
  css?: SerializedStyles;
  color: 'primary' | 'secondary' | 'success' | 'error';
  align: string;
};

const StyleBox = styled(MuiBox)<MuiBoxProps>(() => ({
  width: '38px!important',
  height: '28px',
}));

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ loading, children, badgeContent, color, onClick, ...rest }, ref) => {
    const onClickCallback = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!loading) {
          onClick && onClick(event);
        }
      },
      [loading, onClick],
    );

    return (
      <StyleBox {...rest} ref={ref} onClick={() => onClickCallback}>
        <MuiBadge
          badgeContent={badgeContent}
          color={color}
          css={
            loading &&
            css`
              color: transparent;
            `
          }
        >
          {children}
        </MuiBadge>
      </StyleBox>
    );
  },
);
