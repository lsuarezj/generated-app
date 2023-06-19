/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment, SyntheticEvent } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

type DialogSymbolProps = {
  classes?: Record<string, any>;
  style?: Record<string, any>;
  css?: SerializedStyles;
  className?: string;
  onClick?: (event: SyntheticEvent | undefined) => void;
  onMouseOver?: (event: SyntheticEvent | undefined) => void;
  onMouseOut?: (event: SyntheticEvent | undefined) => void;
  onMouseDown?: (event: SyntheticEvent | undefined) => void;
  onMouseUp?: (event: SyntheticEvent | undefined) => void;
  onMouseEnter?: (event: SyntheticEvent | undefined) => void;
  onMouseLeave?: (event: SyntheticEvent | undefined) => void;
  onWheel?: (event: SyntheticEvent | undefined) => void;
  onContextMenu?: (event: SyntheticEvent | undefined) => void;
  onAuxClick?: (event: SyntheticEvent | undefined) => void;
  onDragStart?: (event: SyntheticEvent | undefined) => void;
  onDragOver?: (event: SyntheticEvent | undefined) => void;
  onDrop?: (event: SyntheticEvent | undefined) => void;
  key?: number;
  id?: string;
  title?: string;
  lang?: string;
  translate?: string;
  draggable?: boolean;
  accept?: string;
  maxFileSize?: number;
  customProps?: any;
  children?: React.ReactNode;
  dialogProps: {
    classes?: Record<string, any>;
    style?: Record<string, any>;
    css?: SerializedStyles;
    className?: string;
    onClick?: (event: SyntheticEvent | undefined) => void;
    onMouseOver?: (event: SyntheticEvent | undefined) => void;
    onMouseOut?: (event: SyntheticEvent | undefined) => void;
    onMouseDown?: (event: SyntheticEvent | undefined) => void;
    onMouseUp?: (event: SyntheticEvent | undefined) => void;
    onMouseEnter?: (event: SyntheticEvent | undefined) => void;
    onMouseLeave?: (event: SyntheticEvent | undefined) => void;
    onWheel?: (event: SyntheticEvent | undefined) => void;
    onContextMenu?: (event: SyntheticEvent | undefined) => void;
    onAuxClick?: (event: SyntheticEvent | undefined) => void;
    onDragStart?: (event: SyntheticEvent | undefined) => void;
    onDragOver?: (event: SyntheticEvent | undefined) => void;
    onDrop?: (event: SyntheticEvent | undefined) => void;
    key?: number;
    id?: string;
    title?: string;
    lang?: string;
    translate?: string;
    draggable?: boolean;
    accept?: string;
    maxFileSize?: number;
    customProps?: any;
    children?: React.ReactNode;
    'aria-describedby'?: string;
    'aria-labelledby'?: string;
    disableEscapeKeyDown?: boolean;
    fullScreen?: boolean;
    fullWidth?: boolean;
    maxWidth?: any;
    onBackdropClick?: (_: any) => void;
    onClose?: (_: any) => void;
    open?: boolean;
    PaperComponent?: any;
    PaperProps?: Record<string, any>;
    scroll?: any;
    TransitionComponent?: any;
    transitionDuration?: Record<string, any>;
    TransitionProps?: {
      onEnter?: (_: any) => void;
      onEntered?: (_: any) => void;
      onEntering?: (_: any) => void;
      onEscapeKeyDown?: (_: any) => void;
      onExit?: (_: any) => void;
      onExited?: (_: any) => void;
      onExiting?: (_: any) => void;
    };
  };
  titleProps?: {
    title?: string;
  };
};

export const DialogSymbol: React.FC<DialogSymbolProps> = (symbolProps) => {
  return (
    <Dialog
      classes={symbolProps.dialogProps.classes}
      style={symbolProps.dialogProps.style}
      css={symbolProps.dialogProps.css}
      className={symbolProps.dialogProps.className}
      onClick={symbolProps.dialogProps.onClick}
      onMouseOver={symbolProps.dialogProps.onMouseOver}
      onMouseOut={symbolProps.dialogProps.onMouseOut}
      onMouseDown={symbolProps.dialogProps.onMouseDown}
      onMouseUp={symbolProps.dialogProps.onMouseUp}
      onMouseEnter={symbolProps.dialogProps.onMouseEnter}
      onMouseLeave={symbolProps.dialogProps.onMouseLeave}
      onWheel={symbolProps.dialogProps.onWheel}
      onContextMenu={symbolProps.dialogProps.onContextMenu}
      onAuxClick={symbolProps.dialogProps.onAuxClick}
      onDragStart={symbolProps.dialogProps.onDragStart}
      onDragOver={symbolProps.dialogProps.onDragOver}
      onDrop={symbolProps.dialogProps.onDrop}
      draggable={symbolProps.draggable}
      aria-describedby={symbolProps.dialogProps['aria-describedby']}
      aria-labelledby={symbolProps.dialogProps['aria-labelledby']}
      disableEscapeKeyDown={symbolProps.dialogProps.disableEscapeKeyDown}
      fullScreen={symbolProps.dialogProps.fullScreen}
      fullWidth={symbolProps.dialogProps.fullWidth}
      maxWidth={symbolProps.dialogProps.maxWidth}
      onBackdropClick={symbolProps.dialogProps.onBackdropClick}
      onClose={symbolProps.dialogProps.onClose}
      open={symbolProps.dialogProps.open}
      PaperProps={symbolProps.dialogProps.PaperProps}
      scroll={symbolProps.dialogProps.scroll}
      transitionDuration={symbolProps.dialogProps.transitionDuration}
    >
      {symbolProps.titleProps?.title && (
        <DialogTitle>{symbolProps.titleProps?.title}</DialogTitle>
      )}
      <DialogContent>{symbolProps.children}</DialogContent>
    </Dialog>
  );
};
