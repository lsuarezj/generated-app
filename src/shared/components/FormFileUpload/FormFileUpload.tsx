import React, { forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormik, useFormikContext } from 'formik';

import { FileUpload } from '../FileUpload';
import { FileUploadProps } from '../FileUpload/FileUpload';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FormFileInputProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    formik?: ReturnType<typeof useFormik>;
    inputProps?: FileUploadProps;
  };

export const FormFileUpload = forwardRef<HTMLInputElement, FormFileInputProps>(
  (
    {
      fieldProps,
      inputProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      className,
      lang,
      title,
      translate,
      accept,
      maxFileSize,
      ...rest
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();

    useEffect(() => {
      setFieldValue(fieldProps.name, []);
      return () => setFieldValue(fieldProps.name, undefined);
    }, [fieldProps.name, setFieldValue]);
    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, form }: FieldProps) => {
          return (
            <FileUpload
              id={id}
              name={fieldProps.name}
              value={field.value}
              InputProps={{
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  const { files } = event.target;
                  if (inputProps?.onChange) {
                    form.setFieldValue(fieldProps.name, files);
                    inputProps?.onChange?.(event);
                  } else {
                    form.setFieldValue(fieldProps.name, files);
                  }
                },
              }}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              translate={translate}
              lang={lang}
              className={className}
              title={title}
              {...inputProps}
              {...rest}
              ref={ref}
              accept={accept}
              maxFileSize={maxFileSize}
            />
          );
        }}
      </Field>
    );
  },
);
