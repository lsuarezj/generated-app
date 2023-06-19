import React, {
  CSSProperties,
  forwardRef,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { FormHelperText, TextField, TextFieldProps, FormControl } from '@mui/material';
import {
  DesktopDatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

import { ComponentBasicProps, ComponentDataProps, TranslateProp } from '../types';

export type DatePickerProps = ComponentDataProps &
  ComponentBasicProps &
  Omit<
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    MuiDatePickerProps<any, any>,
    'value' | 'initialFocusedDate' | 'renderInput' | 'onChange' | 'value'
  > & {
    renderInput?: (
      props: TextFieldProps,
    ) => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
    initialFocusedDate?: string;
    style?: CSSProperties;
    css?: string;
    error?: boolean;
    helperText?: React.ReactNode;
    inputVariant?: 'filled' | 'standard' | 'outlined';
    onChange?: MuiDatePickerProps<any, any>['onChange'];
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMouseOver?: MouseEventHandler<HTMLDivElement>;
    onMouseOut?: MouseEventHandler<HTMLDivElement>;
    onMouseDown?: MouseEventHandler<HTMLDivElement>;
    onMouseUp?: MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    onWheel?: MouseEventHandler<HTMLDivElement>;
    onContextMenu?: MouseEventHandler<HTMLDivElement>;
    onAuxClick?: MouseEventHandler<HTMLDivElement>;
    value?: MuiDatePickerProps<any, any>['value'];
  };

const DEFAULT_FORMAT = 'MM/dd/yyyy';

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      onChange = () => undefined,
      value,
      initialFocusedDate,
      renderInput,
      error,
      helperText,
      disabled,
      className,
      style,
      css,
      inputVariant,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...otherDatePickerProps
    },
    ref,
  ) => {
    const inputFormat = otherDatePickerProps.inputFormat ?? DEFAULT_FORMAT;
    const initialValue = useMemo(() => value || initialFocusedDate, [initialFocusedDate, value]) as
      | string
      | undefined;
    const parsedDate = useMemo(() => DateTime.fromFormat(value ?? initialValue, inputFormat), [
      initialValue,
      inputFormat,
      value,
    ]);
    const isValidDate = parsedDate.isValid;
    const [localValue, setLocalValue] = useState<DateTime | null>(
      isValidDate ? parsedDate : DateTime.now(),
    );
    const InputProps = useMemo(
      () => ({
        style,
        css,
        className,
        error,
        ...otherDatePickerProps.InputProps,
      }),
      [style, css, className, error, otherDatePickerProps.InputProps],
    );

    const handleDateChange = (date: unknown) => {
      setLocalValue(date as DateTime | null);
      onChange?.(date, (date as DateTime | null)?.toFormat(inputFormat));
    };

    useEffect(() => {
      setLocalValue(parsedDate);
    }, [value, parsedDate]);

    const renderInputFunction =
      renderInput || (params => <TextField {...params} variant={inputVariant} />);

    return (
      <FormControl
        disabled={disabled}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={otherDatePickerProps.id}
        title={otherDatePickerProps.title}
        lang={otherDatePickerProps.lang}
        translate={otherDatePickerProps.translate as TranslateProp}
        className={className}
        onClick={otherDatePickerProps.onClick}
        onMouseOver={otherDatePickerProps.onMouseOver}
        onMouseOut={otherDatePickerProps.onMouseOut}
        onMouseDown={otherDatePickerProps.onMouseDown}
        onMouseUp={otherDatePickerProps.onMouseUp}
        onMouseEnter={otherDatePickerProps.onMouseEnter}
        onMouseLeave={otherDatePickerProps.onMouseLeave}
        onWheel={otherDatePickerProps.onWheel}
        onContextMenu={otherDatePickerProps.onContextMenu}
        onAuxClick={otherDatePickerProps.onAuxClick}
      >
        <MuiDatePicker
          {...otherDatePickerProps}
          disabled={disabled}
          InputProps={InputProps}
          onChange={handleDateChange}
          value={localValue}
          inputFormat={inputFormat}
          renderInput={renderInputFunction}
          data-test={dataTest}
          data-node-id={dataNodeID}
          data-node-render-path={dataRenderPath}
        />
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);
