import {
  useRef,
  forwardRef,
  useLayoutEffect,
  Ref,
  useCallback,
  MutableRefObject,
  ElementType,
} from 'react';

import styled from '@emotion/styled';
import {
  DataGrid as MaterialDataGrid,
  DataGridProps as MaterialDataGridProps,
  GridCallbackDetails,
  GridSelectionModel,
} from '@mui/x-data-grid';
import CSS from 'csstype';

import { ComponentDataProps, ComponentBasicProps } from '../types';

export type DataGridProps = MaterialDataGridProps &
  ComponentDataProps &
  ComponentBasicProps & {
    style?: CSS.Properties<string | number>;
    showTableBorder?: boolean;
    onCellHover: ElementType;
    onRowHover: ElementType;
    onError: ElementType;
    onRowSelected: ElementType;
    onSelectionChange?: (selectionModel: GridSelectionModel, details: GridCallbackDetails) => void;
  };

const DataGridWrapper = styled.div<Pick<DataGridProps, 'showTableBorder'>>`
  & .MuiDataGrid-root {
    ${props => !props.showTableBorder && `border: none;`}
  }
`;

export const DataGrid = forwardRef(
  (
    {
      style,
      className,
      showTableBorder,
      rows = [],
      columns = [],
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      lang,
      translate,
      ...gridRestProps
    }: DataGridProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const filteredRows = Array.isArray(rows) ? rows.filter(row => row.id) : [];
    const domRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

    const refCallback = useCallback(
      (node: HTMLDivElement) => {
        if (typeof ref === 'function') ref(node);

        if (typeof domRef === 'object') domRef.current = node;
      },
      [ref],
    );

    useLayoutEffect(() => {
      if (typeof domRef === 'object' && domRef?.current) {
        const gridDiv = domRef.current;
        const gridEl = gridDiv.querySelector('div') as HTMLDivElement;

        if (gridEl?.style) gridEl.style.height = '';
      }
    });

    return (
      <DataGridWrapper
        ref={refCallback}
        style={style}
        id={id}
        className={className}
        title={title}
        lang={lang}
        translate={translate}
        showTableBorder={showTableBorder}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
      >
        <MaterialDataGrid
          {...gridRestProps}
          onSelectionModelChange={gridRestProps.onSelectionChange}
          componentsProps={{
            cell: {
              onMouseEnter: gridRestProps.onCellHover,
            },
            row: {
              onMouseEnter: gridRestProps.onRowHover,
            },
            baseCheckbox: {
              onInput: gridRestProps.onRowSelected,
            },
            errorOverlay: gridRestProps.onError,
          }}
          rows={filteredRows}
          columns={columns}
        />
      </DataGridWrapper>
    );
  },
);
