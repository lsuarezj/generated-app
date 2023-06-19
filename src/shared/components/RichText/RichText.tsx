import { forwardRef, Ref } from 'react';

import { SerializedStyles } from '@emotion/react';

import { ComponentBasicProps, ComponentDataProps } from '../types';

type RichTextProps = ComponentDataProps &
  ComponentBasicProps & {
    style?: Record<string, string>;
    children?: React.ReactNode;
    css?: SerializedStyles;
  };

export const RichText = forwardRef(
  (
    {
      style = {},
      id,
      title,
      className,
      lang,
      translate,
      children,
      ...rest
    }: RichTextProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        {...rest}
        style={{ ...style, overflow: 'auto' }}
        id={id}
        title={title}
        className={className}
        lang={lang}
        translate={translate as 'yes' | 'no' | undefined}
      >
        {children}
      </div>
    );
  },
);
