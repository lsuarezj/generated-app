/** @jsxRuntime classic */
/** @jsx jsx */

import React, { Fragment, SyntheticEvent } from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { RouteHook, RouteLayout, Box } from 'shared/components';
import { Drawer } from '@mui/material';

type BasePageLayoutProps = {
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
  path?: any;
  exact?: boolean;
  router?: string;
  content?: React.ReactNode;
  leftMenu?: React.ReactNode;
  header?: React.ReactNode;
  drawerOpen?: boolean;
  drawerOpenWidth?: number;
  drawerClosedWidth?: number;
  drawerAnchor?: any;
  drawerVariant?: any;
  drawerOnClose?: (event: any) => void;
};

export const BasePageLayout: React.FC<BasePageLayoutProps> = (symbolProps) => {
  return (
    <RouteHook path={symbolProps.path} exact={true} authAccess="any">
      <RouteLayout>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent:
              symbolProps?.drawerAnchor === 'left' ? 'flex-end' : 'flex-start',
            height: '100vh',
          }}
        >
          <Drawer
            open={symbolProps.drawerOpen}
            anchor={symbolProps?.drawerAnchor}
            transitionDuration={300}
            onClose={symbolProps?.drawerOnClose}
            variant={symbolProps?.drawerVariant}
          >
            <Box
              style={{
                width:
                  symbolProps.drawerOpen &&
                  symbolProps.drawerVariant === 'permanent'
                    ? `${symbolProps.drawerOpenWidth}px`
                    : !symbolProps.drawerOpen &&
                      symbolProps.drawerVariant === 'permanent'
                    ? `${symbolProps.drawerClosedWidth}px`
                    : `${symbolProps.drawerOpenWidth}px`,
                transition: '300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                flexShrink: '0',
                height: '100vh',
                whiteSpace: 'nowrap',
                overflowX: 'hidden',
              }}
            >
              {symbolProps.leftMenu}
            </Box>
          </Drawer>
          <div
            style={{
              flexGrow: '1',
              maxWidth:
                symbolProps.drawerOpen &&
                symbolProps.drawerVariant === 'permanent'
                  ? `calc(100% - ${symbolProps.drawerOpenWidth}px)`
                  : !symbolProps.drawerOpen &&
                    symbolProps.drawerVariant === 'permanent'
                  ? `calc(100% - ${symbolProps.drawerClosedWidth}px)`
                  : symbolProps.drawerOpen &&
                    symbolProps.drawerVariant === 'persistent'
                  ? `calc(100% - ${symbolProps.drawerOpenWidth}px)`
                  : '100%',
              transition: '300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
              height: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 0',
                height: '100%',
              }}
            >
              {[symbolProps.header, symbolProps.content]}
            </div>
          </div>
        </div>
      </RouteLayout>
    </RouteHook>
  );
};
