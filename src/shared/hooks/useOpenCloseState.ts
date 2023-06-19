import React, { Fragment, useCallback, useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';

export const useOpenCloseState = (defaultState: boolean) => {
  const [isOpened, setIsOpened] = useState(defaultState);
  const [args, setArgs] = useState<unknown>(null);

  const open = useCallback((passedArgs?: unknown): void => {
    setIsOpened(true);
    setArgs(passedArgs ?? null);
  }, []);

  const close = useCallback(() => {
    setIsOpened(false);
    setArgs(null);
  }, []);

  const toggle = useCallback(() => {
    if (isOpened) {
      close();
    } else {
      open();
    }
  }, [close, isOpened, open]);

  return {
    isOpened,
    open,
    close,
    toggle,
    args,
  };
};
