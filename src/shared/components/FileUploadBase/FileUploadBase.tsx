import { forwardRef, useState, useEffect, useCallback, useMemo } from 'react';

import { ApolloProvider, gql, useMutation, useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import * as filestack from 'filestack-js';

import {
  ExposedComponentProps,
  FileUploadBaseProps,
  FileUploadInfoQueryType,
  FileUploadMutationReturnType,
  FileUploadMutationType,
} from './types';
import { getApolloClient } from './utils';

export const FILE_UPLOAD_INFO_MUTATION = gql`
  mutation createFile($file: FileCreateInput!) {
    fileCreate(data: $file) {
      id
    }
  }
`;

export const FILE_UPLOAD_INFO_QUERY = gql`
  query FileUploadInfo {
    fileUploadInfo {
      policy
      signature
      apiKey
      path
    }
  }
`;

const InputFileUpload = ({
  ref,
  onSuccess,
  onError,
  uploadOnChange,
  maxFileSize,
  setMethods,
  rest,
}: ExposedComponentProps) => {
  const [fileStackClient, setFileStackClient] = useState<filestack.Client | null>();
  const [uploadedFile, setUploadedFile] = useState<FileUploadMutationType['file']>({
    filename: '',
    fileId: '',
  });
  const [progress, setProgress] = useState(0);
  const { data: fileUploadInfo } = useQuery<FileUploadInfoQueryType>(FILE_UPLOAD_INFO_QUERY, {
    onCompleted(data) {
      const { apiKey, policy, signature } = data.fileUploadInfo;

      setFileStackClient(
        filestack.init(apiKey, {
          security: {
            policy,
            signature,
          },
          sessionCache: false,
        }),
      );
    },

    onError() {
      setFileStackClient(null);
    },
  });
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  const [addFile] = useMutation<FileUploadMutationReturnType, FileUploadMutationType>(
    FILE_UPLOAD_INFO_MUTATION,
  );

  const isFileExceedingFileSize = useCallback(
    (file: File) => {
      if (!maxFileSize) return false;

      const isExceedingSize = file.size > maxFileSize * 1024 * 1024;

      return isExceedingSize;
    },
    [maxFileSize],
  );

  const uploadFile = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      if (isFileExceedingFileSize(files[0])) {
        onError && onError(new Error('File exceeded max file size'));
        return;
      }

      setProgress(0);

      try {
        const response: filestack.PickerFileMetadata = await fileStackClient?.upload(
          files[0],
          {
            onProgress: evt => {
              setProgress(evt.totalPercent);
            },
          },
          {
            path: fileUploadInfo?.fileUploadInfo.path,
          },
        );

        await addFile({
          variables: {
            file: { filename: response.filename, fileId: response.handle },
          },
        });

        setUploadedFile({ filename: response.filename, fileId: response.handle });

        onSuccess && onSuccess();
      } catch (e) {
        const errorMsg = new Error(JSON.stringify(e));
        onError && onError(errorMsg);
        setProgress(0);
      }
    },
    [
      addFile,
      fileStackClient,
      fileUploadInfo?.fileUploadInfo.path,
      isFileExceedingFileSize,
      onError,
      onSuccess,
    ],
  );

  useEffect(() => {
    setMethods((prev: Record<string, unknown>) => ({
      ...prev,
      fileUploaded: uploadedFile,
      progress,
      upload: () => uploadFile(selectedFile),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, progress, uploadedFile]);

  if (!fileStackClient) {
    return (
      <Button fullWidth size="small" disabled {...rest}>
        Choose File
      </Button>
    );
  }

  return (
    <input
      type="file"
      onChange={
        uploadOnChange ? e => uploadFile(e.target.files) : e => setSelectedFile(e.target.files)
      }
      ref={ref}
      {...rest}
    />
  );
};

export const FileUploadBase = forwardRef<HTMLButtonElement, FileUploadBaseProps>(
  (
    {
      onSuccess,
      onError,
      uploadOnChange,
      maxFileSize,
      workspaceId,
      setMethods,
      value,
      apiToken,
      ...rest
    },
    ref,
  ) => {
    const client = useMemo(() => {
      return getApolloClient(workspaceId, apiToken);
    }, [apiToken, workspaceId]);

    return (
      <ApolloProvider client={client}>
        <InputFileUpload
          setMethods={setMethods}
          ref={ref}
          onSuccess={onSuccess}
          uploadOnChange={uploadOnChange}
          onError={onError}
          maxFileSize={maxFileSize}
          rest={rest}
        />
      </ApolloProvider>
    );
  },
);
