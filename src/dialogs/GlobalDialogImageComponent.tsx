/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { useAssets, useGlobalState } from 'providers';
import { DialogSymbol } from 'shared/symbols';
import { Button, Image } from 'shared/components';

export const GlobalDialogImageComponent: React.FC = ({ props }) => {
  const assets = useAssets();
  const { uncaughtErrors, GlobalDialogImage } = useGlobalState();

  return (
    <DialogSymbol
      dialogProps={{
        fullWidth: true,
        maxWidth: 'sm',
        onClose: () => {
          GlobalDialogImage.close();
        },
        open: GlobalDialogImage.isOpened,
      }}
      titleProps={{ title: 'Dialog Title' }}
    >
      <Button
        onClick={(event) => {
          // Your JavaScript code here
          GlobalDialogImage.close();
        }}
        color="primary"
        disabled={false}
        loading={false}
        size="medium"
        variant="text"
        type="button"
      >
        Close
      </Button>
      <Image src={assets.asset.src} />
    </DialogSymbol>
  );
};
