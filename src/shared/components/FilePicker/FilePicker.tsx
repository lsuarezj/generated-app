import { forwardRef } from 'react';

// import { DropzoneArea, DropzoneAreaProps } from 'material-ui-dropzone';

import { ComponentDataProps } from '../types';

export type FilePickerProps = ComponentDataProps;

export const FilePicker = forwardRef<HTMLDivElement, FilePickerProps>(
  (
    {
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...otherFilePickerProps
    },
    ref,
  ) => {
    // material-ui-dropzone doesn't support material v5 right now.
    // Look for a fork or other lib for FilePicker
    return null;

    /* return (
      <div
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
      >
        <DropzoneArea
          {...otherFilePickerProps}
          // temporary solution, waiting to fix: https://github.com/Yuvaleros/material-ui-dropzone/issues/265
          // right now maybe replace with user's own alert on change / on delete events
          showAlerts={false}
        />
      </div>
    ); */
  },
);
