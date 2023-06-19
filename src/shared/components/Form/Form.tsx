import React, { forwardRef, MouseEventHandler, Ref } from 'react';

import { FormikConfig, useFormik, Formik } from 'formik';

import { ComponentDataProps, ComponentBasicProps } from '../types';

export type FormProps = ComponentDataProps &
  ComponentBasicProps & {
    style?: React.CSSProperties;
    className?: string;
    onSubmit: FormikConfig<Record<string, unknown>>['onSubmit'];
    initialValues?: FormikConfig<Record<string, unknown>>['initialValues'];
    render?: (form: ReturnType<typeof useFormik>) => React.ReactNode;
    children?: React.ReactNode;
    // html events
    onClick?: MouseEventHandler<HTMLFormElement>;
    onMouseOver?: MouseEventHandler<HTMLFormElement>;
    onMouseOut?: MouseEventHandler<HTMLFormElement>;
    onMouseDown?: MouseEventHandler<HTMLFormElement>;
    onMouseUp?: MouseEventHandler<HTMLFormElement>;
    onMouseEnter?: MouseEventHandler<HTMLFormElement>;
    onMouseLeave?: MouseEventHandler<HTMLFormElement>;
    onWheel?: MouseEventHandler<HTMLFormElement>;
    onContextMenu?: MouseEventHandler<HTMLFormElement>;
    onAuxClick?: MouseEventHandler<HTMLFormElement>;
  };

export const Form = forwardRef(
  (
    {
      style,
      className,
      children,
      onSubmit,
      initialValues = {},
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...props
    }: FormProps,
    ref: Ref<HTMLFormElement>,
  ) => {
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {formProps => (
          <form
            ref={ref}
            style={style}
            className={className}
            data-test={dataTest}
            data-node-id={dataNodeID}
            data-node-render-path={dataRenderPath}
            {...props}
            onSubmit={formProps.handleSubmit}
          >
            {typeof children === 'function' ? children(formProps) : children}
          </form>
        )}
      </Formik>
    );
  },
);
