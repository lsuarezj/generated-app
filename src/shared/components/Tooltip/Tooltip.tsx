import { forwardRef } from 'react';

import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';

import { ComponentBasicProps, ComponentDataProps } from '../types';

type TooltipProps = MuiTooltipProps & ComponentDataProps & ComponentBasicProps;

export type TooltipPositionType = MuiTooltipProps['placement'];

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      className,
      lang,
      translate,
      ...tooltipProps
    },
    ref,
  ): JSX.Element => {
    return (
      <div
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={id}
        className={className}
        lang={lang}
        translate={translate}
      >
        <MuiTooltip {...tooltipProps}>
          <div>{children}</div>
        </MuiTooltip>
      </div>
    );
  },
);
