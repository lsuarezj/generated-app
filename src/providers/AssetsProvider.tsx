import React, { createContext, useContext } from 'react';

import asset from '../assets/asset.png';
import images from '../assets/images.png';
import a62d285a53681a71b4bdc8logo from '../assets/a62d285a53681a71b4bdc8logo.svg';

type AssetName = string;

type Asset = Record<string, unknown>;

type AssetList = Record<AssetName, Asset>;

const AssetsContext = createContext<AssetList>({});

const assets = {
  asset: {
    src: asset,
    previewUrl: asset,
    name: 'asset',
    size: 19093,
    type: 'image',
    width: 280,
    height: 280,
    mimetype: 'image/png',
    createdAt: '2023-06-15T14:23:38.619Z',
    createdBy: 'juan.posada@8base.com',
    updatedAt: '2023-06-15T14:23:38.619Z',
    path:
      'qa3/clbquttlo002108jw1o4xfiw1/8ef0216c-7086-4475-9f6d-f33c40654a20/28789399.png',
    mimeType: 'image/png',
  },
  images: {
    src: images,
    previewUrl: images,
    name: 'images',
    size: 3334,
    type: 'image',
    width: 219,
    height: 230,
    mimetype: 'image/png',
    createdAt: '2023-06-15T14:24:15.327Z',
    createdBy: 'juan.posada@8base.com',
    updatedAt: '2023-06-15T14:24:15.327Z',
    path:
      'qa3/clbquttlo002108jw1o4xfiw1/6c295dac-4917-47ac-b17d-ff5f0c152e7a/images.png',
    mimeType: 'image/png',
  },
  a62d285a53681a71b4bdc8logo: {
    src: a62d285a53681a71b4bdc8logo,
    previewUrl: a62d285a53681a71b4bdc8logo,
    name: 'a62d285a53681a71b4bdc8logo',
    size: 5186,
    type: 'svg',
    mimetype: 'image/svg+xml',
    createdAt: '2023-06-15T14:24:36.838Z',
    createdBy: 'juan.posada@8base.com',
    updatedAt: '2023-06-15T14:24:36.838Z',
    path:
      'qa3/clbquttlo002108jw1o4xfiw1/e1595981-981f-4adc-ae97-73b2592bb708/61a62d285a53681a71b4bdc8_logo.svg',
    mimeType: 'image/svg+xml',
  },
};

export const AssetsProvider: React.FC = ({ children }) => {
  return (
    <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>
  );
};

export const useAssets = (): AssetList => {
  return useContext(AssetsContext);
};
