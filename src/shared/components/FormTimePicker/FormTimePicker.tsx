/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent, forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { getIsInvalid } from '../common';
import { TimePicker, TimePickerProps } from '../TimePicker';
import { ComponentDataProps, ComponentBasicProps } from '../types';

export type FormTimePickerProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    timePickerProps?: TimePickerProps;
    onAccept?: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
  };

export const FormTimePicker = forwardRef<HTMLInputElement, FormTimePickerProps>(
  (
    {
      fieldProps,
      timePickerProps,
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
        timePickerProps?.initialFocusedTime || timePickerProps?.value || '',
      );
      return () => setFieldValue(fieldProps.name, undefined);
    }, [
      fieldProps.name,
      setFieldValue,
      timePickerProps?.initialFocusedTime,
      timePickerProps?.value,
    ]);

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, form, meta }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;

          return (
            <TimePicker
              {...rest}
              id={id}
              title={title}
              lang={lang}
              className={className}
              translate={translate}
              ref={ref}
              {...timePickerProps}
              value={field.value || timePickerProps?.value}
              onChange={(time, value) => {
                form.setFieldValue(fieldProps.name, value);
                timePickerProps?.onChange?.(value);
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
