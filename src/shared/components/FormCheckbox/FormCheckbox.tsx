/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ChangeEvent, forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { Checkbox, CheckboxProps } from '../Checkbox';
import { getIsInvalid } from '../common';
import { ComponentDataProps, ComponentBasicProps } from '../types';

export type FormCheckboxProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    checkboxProps: CheckboxProps;
    onChange?: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
  };

export const FormCheckbox = forwardRef<HTMLDivElement, FormCheckboxProps>(
  (
    {
      checkboxProps,
      fieldProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      lang,
      className,
      translate,
      onChange = () => {},
      ...rest
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();
    const { disabled, ...otherCheckboxProps } = checkboxProps ?? {};

    useEffect(() => {
      setFieldValue(fieldProps.name, false);
      return () => setFieldValue(fieldProps.name, undefined);
    }, [fieldProps.name, setFieldValue]);

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;

          return (
            <Checkbox
              {...rest}
              id={id}
              title={title}
              lang={lang}
              className={className}
              translate={translate}
              ref={ref}
              {...otherCheckboxProps}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              disabled={disabled}
              name={fieldProps.name}
              checked={Boolean(field.value)}
              onChange={(event, checked) => {
                form.setFieldValue(fieldProps.name, checked);
                onChange(event);
              }}
              error={isInvalid}
              helperText={errorText}
            />
          );
        }}
      </Field>
    );
  },
);
