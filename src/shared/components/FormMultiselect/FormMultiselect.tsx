import { forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext } from 'formik';

import { getIsInvalid } from '../common';
import { Multiselect, MultiselectProps } from '../Multiselect';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FormMultiselectProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    selectProps: MultiselectProps;
  };

export const FormMultiselect = forwardRef<HTMLDivElement, FormMultiselectProps>(
  (
    {
      fieldProps,
      selectProps,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      className,
      lang,
      translate,
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
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;

          return (
            <Multiselect
              {...rest}
              {...selectProps}
              name={fieldProps.name}
              value={field.value}
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
