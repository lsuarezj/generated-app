import React, { CSSProperties, forwardRef, useMemo } from 'react';

import { SerializedStyles, css } from '@emotion/react';
import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material';
import { bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';

import { ComponentDataProps, ComponentBasicProps } from '../types';

export type MenuProps = ComponentDataProps &
  Omit<MuiMenuProps, 'open'> &
  ComponentBasicProps & {
    target: React.ReactNode;
    content: (args: { onClose: () => void }) => React.ReactNode;
    forceOpen?: boolean;
    __nodeAlias?: string;
    style?: CSSProperties;
    css?: SerializedStyles;
  };

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      target,
      content,
      forceOpen,
      __nodeAlias,
      style,
      css: cssProp,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      className,
      lang,
      translate,
      ...menuProps
    },
    ref,
  ): JSX.Element => {
    const popupState = usePopupState({
      variant: 'popover',
      popupId: __nodeAlias,
    });

    const bindMenuState = useMemo(() => bindMenu(popupState), [popupState]);
    const bindTriggerState = useMemo(() => bindTrigger(popupState), [popupState]);
    const open = forceOpen === undefined ? bindMenuState.open : forceOpen;

    return (
      <div
        ref={ref}
        style={style}
        css={cssProp}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={id}
        title={title}
        className={className}
        lang={lang}
        translate={translate}
      >
        <div
          {...bindTriggerState}
          css={css`
            display: inline-flex;
          `}
        >
          {target}
        </div>
        <MuiMenu {...bindMenuState} {...menuProps} open={open}>
          {content({ onClose: bindMenuState.onClose })}
        </MuiMenu>
      </div>
    );
  },
);
