/* eslint-disable @typescript-eslint/no-empty-function */
import { forwardRef, useEffect } from 'react';

import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material';
import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { Autocomplete, AutocompleteProps } from '../Autocomplete';
import { getIsInvalid } from '../common';
import { ComponentDataProps, ComponentBasicProps } from '../types';

export type FormAutocompleteProps = ComponentDataProps &
  ComponentBasicProps & {
    style?: React.CSSProperties;
    className?: string;
    lang?: string;
    title?: string;
    required?: boolean;
    autofocus?: boolean;
    readonly?: boolean;
    translate?: string;
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    autocompleteProps: AutocompleteProps & {
      onChange?: (
        event: React.ChangeEvent<Record<string, unknown>>,
        value: unknown,
        reason?: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<unknown>,
        fieldProps?: FieldProps,
      ) => void;
    };
    onChange: (
      event: React.ChangeEvent<Record<string, unknown>>,
      value: unknown,
      reason?: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<unknown>,
      fieldProps?: FieldProps,
    ) => void;
  };

export const FormAutocomplete = forwardRef<HTMLDivElement, FormAutocompleteProps>(
  (
    {
      id,
      className,
      title,
      lang,
      translate,
      required = false,
      autofocus = false,
      readonly = false,
      fieldProps,
      autocompleteProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      onChange = () => {},
      ...rest
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();
    useEffect(() => {
      setFieldValue(fieldProps.name, {
        label: '',
        value: '',
      });
      return () => setFieldValue(fieldProps.name, undefined);
    }, [fieldProps.name, setFieldValue]);

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;
          return (
            <Autocomplete
              {...rest}
              {...autocompleteProps}
              ref={ref}
              id={id}
              className={className}
              title={title}
              autoFocus={autofocus}
              required={required}
              lang={lang}
              translate={translate}
              readOnly={readonly}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              value={field.value}
              error={isInvalid}
              helperText={errorText}
              name={fieldProps.name}
              // TODO: rewrite types for onChange function (Material-v4 => Material-v5)
              // This was a little workaround but after update @types/react to version 17.0.3
              // the typescript starts to show a warn here here so this function should be rewritten
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={(
                event: React.ChangeEvent<Record<string, unknown>>,
                value: unknown,
                reason?: AutocompleteChangeReason,
                details?: AutocompleteChangeDetails<unknown>,
              ) => {
                if (autocompleteProps.onChange) {
                  autocompleteProps.onChange(event, value, reason, details, {
                    field,
                    meta,
                    form,
                  });
                  onChange(event, value, reason, details, {
                    field,
                    meta,
                    form,
                  });
                } else {
                  form.setFieldValue(fieldProps.name, value);
                  onChange(event, value, reason, details, {
                    field,
                    meta,
                    form,
                  });
                }
              }}
            />
          );
        }}
      </Field>
    );
  },
);
