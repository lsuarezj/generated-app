/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ChangeEvent, forwardRef, useEffect } from 'react';

import { Field, FieldProps, FieldValidator, useFormikContext, useFormik } from 'formik';

import { getIsInvalid } from '../common';
import { Slider, SliderProps } from '../Slider';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type FormSliderProps = ComponentDataProps &
  ComponentBasicProps & {
    fieldProps: {
      name: string;
      validate?: FieldValidator;
    };
    onChange: (event: ChangeEvent<unknown>) => void;
    formik?: ReturnType<typeof useFormik>;
    sliderProps: SliderProps;
  };

export const FormSlider = forwardRef<HTMLDivElement, FormSliderProps>(
  (
    {
      sliderProps,
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
    },
    ref,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();

    useEffect(() => {
      setFieldValue(fieldProps.name, 0);
      return () => setFieldValue(fieldProps.name, undefined);
    }, [setFieldValue, fieldProps.name]);

    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field, meta, form }: FieldProps) => {
          const isInvalid = getIsInvalid({ meta, form });
          const errorText = isInvalid ? meta.error : undefined;

          return (
            <Slider
              {...rest}
              {...sliderProps}
              ref={ref}
              data-test={dataTest}
              data-node-id={dataNodeID}
              data-node-render-path={dataRenderPath}
              name={fieldProps.name}
              onChange={event => {
                field.onChange(event);
                onChange((event as unknown) as ChangeEvent<HTMLInputElement>);
              }}
              error={isInvalid}
              helperText={errorText}
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
