/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent, forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { getIsInvalid } from '../common';
import { DatePicker, DatePickerProps } from '../DatePicker';
import { ComponentDataProps, ComponentBasicProps } from '../types';

export type FormDatePickerProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    datePickerProps?: DatePickerProps;
    onAccept?: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
  };

export const FormDatePicker = forwardRef<HTMLInputElement, FormDatePickerProps>(
  (
    {
      fieldProps,
      datePickerProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      lang,
      className,
      translate,
      onAccept = () => {},
      ...rest
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
      setFieldValue(
        fieldProps.name,
        datePickerProps?.value || datePickerProps?.initialFocusedDate || '',
      );
      return () => setFieldValue(fieldProps.name, undefined);
    }, [
      datePickerProps?.initialFocusedDate,
      datePickerProps?.value,
      fieldProps.name,
      setFieldValue,
    ]);

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, form, meta }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;

          return (
            <DatePicker
              {...rest}
              id={id}
              title={title}
              lang={lang}
              className={className}
              translate={translate}
              ref={ref}
              {...datePickerProps}
              value={field.value || datePickerProps?.value}
              onChange={(date, value) => {
                form.setFieldValue(fieldProps.name, value);
                datePickerProps?.onChange?.(value);
                field.onChange(value);
                setFieldValue(
                  fieldProps.name,
                  datePickerProps?.initialFocusedDate || datePickerProps?.value || '',
                );
              }}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              error={isInvalid}
              helperText={errorText}
            />
          );
        }}
      </Field>
    );
  },
);
