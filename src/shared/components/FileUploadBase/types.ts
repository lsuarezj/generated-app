import React from 'react';

export type ExposedComponentProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  uploadOnChange?: boolean;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  maxFileSize?: number;
  setMethods: (arg: unknown) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest?: any;
};

export type FileUploadBaseProps = HTMLInputElement &
  ExposedComponentProps & {
    apiToken: string;
    workspaceId: string;
  };

export type FileUploadInfoQueryType = {
  fileUploadInfo: {
    policy: string;
    signature: string;
    apiKey: string;
    path: string;
  };
};

export type FileUploadMutationType = {
  file: {
    fileId: string;
    filename: string;
  };
};

export type FileUploadMutationReturnType = {
  id: string;
};
