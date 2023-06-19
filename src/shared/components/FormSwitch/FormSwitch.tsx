/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ChangeEvent, forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { getIsInvalid } from '../common';
import { Switch, SwitchProps } from '../Switch';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FormSwitchProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    switchProps: SwitchProps;
    value?: string;
    autofocus?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
  };

export const FormSwitch = forwardRef<HTMLDivElement, FormSwitchProps>(
  (
    {
      switchProps,
      fieldProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      value,
      autofocus,
      id,
      title,
      className,
      lang,
      translate,
      onChange = () => {},
      ...rest
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();

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
            <Switch
              {...rest}
              {...switchProps}
              ref={ref}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              checked={field.value}
              onChange={(event, checked) => {
                form.setFieldValue(fieldProps.name, checked);
                onChange(event);
              }}
              name={fieldProps.name}
              error={isInvalid}
              helperText={errorText}
              autoFocus={autofocus}
              value={value}
              id={id}
              title={title}
              className={className}
              lang={lang}
              translate={translate}
            />
          );
        }}
      </Field>
    );
  },
);
