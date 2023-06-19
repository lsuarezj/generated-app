import React, { forwardRef, Ref, useEffect } from 'react';

import { FieldArray, FieldArrayConfig, useFormikContext } from 'formik';

import { ComponentDataProps } from '../types';

export type FormFieldArrayProps = ComponentDataProps &
  FieldArrayConfig & {
    className: string;
    id: string;
    title: string;
    style: React.CSSProperties;
  };

export const FormFieldArray = forwardRef(
  (
    {
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      style,
      className,
      id,
      title,
      ...props
    }: FormFieldArrayProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { setFieldValue } = useFormikContext<Record<string, unknown>>();

    useEffect(() => {
      return () => setFieldValue(props.name, undefined);
    }, [props.name, setFieldValue]);

    return (
      <div
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        className={className}
        style={style}
        id={id}
        title={title}
      >
        <FieldArray {...props} />
      </div>
    );
  },
);
