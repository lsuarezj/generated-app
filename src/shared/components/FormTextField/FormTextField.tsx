/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent, forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormik, useFormikContext } from 'formik';

import { fieldValidation, getIsInvalid } from '../common';
import { TextField, TextFieldProps } from '../TextField';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FormTextFieldProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
      value: string;
    };
    onChange: (event: ChangeEvent<unknown>) => void;
    formik?: ReturnType<typeof useFormik>;
    inputProps?: TextFieldProps;
  };

export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  (
    {
      fieldProps,
      inputProps = {},
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      className,
      lang,
      title,
      translate,
      onChange = () => {},
      ...rest
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();
    useEffect(() => {
      setFieldValue(fieldProps.name, '');
      return () => setFieldValue(fieldProps.name, undefined);
    }, [setFieldValue, fieldProps.name]);
    const validateField = (value: string): string | undefined => {
      return fieldValidation(value, inputProps.validation, inputProps.regularExpression);
    };

    return (
      <Field name={fieldProps.name} validate={validateField}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? inputProps.helperErrorText : inputProps.helperText;
          return (
            <TextField
              ref={ref}
              {...inputProps}
              name={fieldProps.name}
              value={field.value || ''}
              onChange={event => {
                field.onChange(event);
                onChange(event);
              }}
              error={isInvalid}
              helperText={errorText}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              id={id}
              translate={translate}
              className={className}
              lang={lang}
              title={title}
              {...rest}
            />
          );
        }}
      </Field>
    );
  },
);
