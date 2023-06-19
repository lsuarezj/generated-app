import { css, SerializedStyles } from '@emotion/react';

const getCustomCSSExtraScope = (): string => {
  return '#user-app-root &';
};

export const generateScopedCSS = (cssString: string): SerializedStyles => {
  return css`\n${getCustomCSSExtraScope()} {${cssString}}`;
};
