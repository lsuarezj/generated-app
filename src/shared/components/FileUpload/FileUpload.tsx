import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  useEffect,
  CSSProperties,
  ChangeEvent,
} from 'react';

import { SerializedStyles } from '@emotion/react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { FieldProps } from 'formik';
import debounce from 'lodash.debounce';
import { isNil } from 'ramda';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FileUploadProps = Omit<MuiTextFieldProps, 'InputProps'> &
  ComponentDataProps &
  ComponentBasicProps & {
    debounce?: number;
    style?: CSSProperties;
    css?: SerializedStyles;
    classes?: Record<string, unknown>;
    className?: string;
    accept?: string;
    maxFileSize?: number;
    InputProps?: MuiTextFieldProps['InputProps'] & {
      style?: CSSProperties;
      css?: SerializedStyles;
      classes?: Record<string, unknown>;
      className?: string;
      onChange: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
    };
    onChange?: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
  };

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({
    debounce: debounceTime,
    onChange,
    'data-test': dataTest,
    'data-node-id': dataNodeID,
    'data-node-render-path': dataRenderPath,
    id,
    InputProps,
    title,
    lang,
    translate,
    accept,
    className,
    onError,
    maxFileSize,
    ...rest
  }) => {
    const [localValue, setLocalValue] = useState<FileList>();

    const createDebounceCallback = useCallback(
      (debounceTimeArg?: number) => {
        return debounce((event, nextValue) => {
          const theElement = event;
          theElement.target.files = nextValue;
          onChange?.(event);
          InputProps?.onChange?.(event);
        }, debounceTimeArg);
      },
      [onChange, InputProps],
    );

    const debouncedChangePropValue = useRef(createDebounceCallback(debounceTime));

    useEffect(() => {
      debouncedChangePropValue.current = createDebounceCallback(debounceTime);
    }, [createDebounceCallback, debounceTime]);

    const isFileExceedingFileSize = useCallback(
      (files: FileList) => {
        if (!maxFileSize) return false;

        const isExceedingSize = [...files].some(file => file.size > maxFileSize * 1024 * 1024);
        // eslint-disable-next-line no-alert
        isExceedingSize && alert('File exceeded max file size');
        return isExceedingSize;
      },
      [maxFileSize],
    );
    const setDebouncedValue = useCallback(
      event => {
        if (!isFileExceedingFileSize(event.target.files)) {
          setLocalValue(event.target.files);

          if (isNil(debounceTime)) {
            onChange?.(event);
            InputProps?.onChange?.(event);
          } else {
            debouncedChangePropValue.current(event, event.target.files);
          }
        } else if (localValue && inputRef && inputRef.current) {
          inputRef.current.files = localValue;
        } else {
          inputRef?.current?.value && (inputRef.current.value = '');
        }
      },
      [isFileExceedingFileSize, localValue, debounceTime, onChange, InputProps],
    );

    const ListFiles = () => {
      if (localValue && localValue.length) {
        const items = [...localValue];

        return (
          <ul>
            {items.map(file => (
              <li key={file.name}>
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={e => {
                    const filteredItems = fileListItems(
                      items.filter(item => item.name !== file.name),
                    );
                    setLocalValue(filteredItems);
                    debouncedChangePropValue.current(e, filteredItems);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        );
      }

      return <></>;
    };

    const inputRef = useRef<HTMLInputElement>(null);

    function fileListItems(files: File[]) {
      const b = new ClipboardEvent('').clipboardData || new DataTransfer();
      for (let i = 0, len = files.length; i < len; i++) b.items.add(files[i]);
      return b.files;
    }

    useEffect(() => {
      if (localValue && inputRef && inputRef.current && !isFileExceedingFileSize(localValue)) {
        inputRef.current.files = localValue;
      }
    }, [isFileExceedingFileSize, localValue]);

    return (
      <>
        <input
          ref={inputRef}
          data-test={dataTest}
          data-node-id={dataNodeID}
          data-node-render-path={dataRenderPath}
          id={id}
          type="file"
          accept={accept}
          max-file-size={maxFileSize}
          multiple
          title={title}
          lang={lang}
          translate={translate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDebouncedValue(event);
          }}
          className={className}
          required={rest.required}
          style={rest.style}
        />
        <ListFiles />
      </>
    );
  },
);
