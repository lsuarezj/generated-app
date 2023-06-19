/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ChangeEvent, forwardRef, Ref, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { getIsInvalid } from '../common';
import { RadioGroup, RadioGroupProps } from '../RadioGroup';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FormRadioGroupProps = ComponentDataProps &
  ComponentBasicProps & {
    children: React.ReactNode;
    radioGroupProps: RadioGroupProps;
    fieldProps: {
      name: string;
      validate?: FieldValidator;
      onChange?: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
    };
    onChange?: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
  };

export const FormRadioGroup = forwardRef(
  (
    {
      children,
      radioGroupProps,
      fieldProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      className,
      lang,
      translate,
      onChange = () => {},
      ...rest
    }: FormRadioGroupProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();

    useEffect(() => {
      setFieldValue(fieldProps.name, '');
      return () => setFieldValue(fieldProps.name, undefined);
    }, [fieldProps.name, setFieldValue]);

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;

          return (
            <RadioGroup
              {...rest}
              {...radioGroupProps}
              ref={ref}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              value={field.value}
              onChange={(event, value) => {
                form.setFieldValue(fieldProps.name, value);
                onChange(event);
              }}
              error={isInvalid}
              helperText={errorText}
              id={id}
              title={title}
              className={className}
              lang={lang}
              translate={translate}
            >
              {children}
            </RadioGroup>
          );
        }}
      </Field>
    );
  },
);
