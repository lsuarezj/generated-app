import React, { CSSProperties, forwardRef } from 'react';

import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import { ComponentBasicProps, ComponentDataProps } from '../types';

const ImageContainer = styled.div`
  display: block;
  width: fit-content;
  height: fit-content;
`;

const ImageBlock = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`;

type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
  style?: CSSProperties;
  css?: SerializedStyles;
} & ComponentDataProps &
  ComponentBasicProps;

/**
 * @description Image wrapper over the original html <img>
 * The wrapper is needed because raw <img> might not resize properly
 * when src gets changed and <img>'s parent is page root
 */
export const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt,
      id,
      className,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      lang,
      translate,
      title,
      style,
      css,
      ...imageProps
    },
    ref,
  ) => {
    return (
      <ImageContainer
        id={id}
        style={style}
        css={css}
        className={className}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        lang={lang}
        translate={translate}
        title={title}
        ref={ref}
      >
        <ImageBlock src={src} alt={alt} {...imageProps} />
      </ImageContainer>
    );
  },
);
