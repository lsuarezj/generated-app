/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent, forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { getIsInvalid } from '../common';
import { Select, SelectProps } from '../Select';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FormSelectProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    selectProps: SelectProps;
    onChange?: (event: ChangeEvent<HTMLInputElement>, fieldProps?: FieldProps) => void;
  };

export const FormSelect = forwardRef<HTMLDivElement, FormSelectProps>(
  (
    {
      fieldProps,
      selectProps: { ...selectProps },
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
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();

    useEffect(() => {
      setFieldValue(fieldProps.name, selectProps?.value || '');
      return () => setFieldValue(fieldProps.name, undefined);
    }, [fieldProps.name, selectProps?.value, setFieldValue]);

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;

          return (
            <Select
              {...rest}
              {...selectProps}
              name={fieldProps.name}
              value={selectProps.value || ''}
              onChange={(event, child) => {
                field.onChange(event);
                selectProps.onChange?.(event, child);
              }}
              error={isInvalid}
              helperText={errorText}
              ref={ref}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
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
