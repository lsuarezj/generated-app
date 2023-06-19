import React, { CSSProperties, forwardRef, MouseEventHandler, useMemo, useState } from 'react';

import { FormHelperText, TextField, TextFieldProps, FormControl } from '@mui/material';
import { StaticTimePicker, MobileTimePicker, DesktopTimePicker } from '@mui/x-date-pickers';
import {
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { DateTime } from 'luxon';

import { ComponentBasicProps, ComponentDataProps, TranslateProp } from '../types';

export type TimePickerProps = ComponentDataProps &
  ComponentBasicProps &
  Omit<
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    MuiTimePickerProps<any, any>,
    'value' | 'renderInput' | 'onChange' | 'value'
  > & {
    renderInput?: (
      props: TextFieldProps,
    ) => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
    initialFocusedTime?: string;
    style?: CSSProperties;
    css?: string;
    error?: boolean;
    helperText?: React.ReactNode;
    inputVariant?: 'filled' | 'standard' | 'outlined';
    responsiveness?: string;
    hours?: boolean;
    minutes?: boolean;
    seconds?: boolean;
    views?: string[] | undefined;
    maxTime?: string;
    minTime?: string;
    ampm?: boolean;
    showToolbar?: boolean;
    onChange?: MuiTimePickerProps<any, any>['onChange'];
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
    value?: MuiTimePickerProps<any, any>['value'];
  };
const COMPONENTTYPES = {
  MuiTimePicker,
  StaticTimePicker,
  MobileTimePicker,
  DesktopTimePicker,
};
const DEFAULT_FORMAT = 'HH:mm:ss';
const DEFAULT_MAX_TIME = '23:59:59';
const DEFAULT_MIN_TIME = '00:00:00';

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      onChange = () => undefined,
      value = '',
      initialFocusedTime,
      renderInput,
      error,
      helperText,
      disabled,
      className,
      style,
      css,
      inputVariant,
      responsiveness,
      hours,
      minutes,
      seconds,
      views,
      maxTime,
      minTime,
      ampm,
      showToolbar,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...otherTimePickerProps
    },
    ref,
  ) => {
    const inputFormat = otherTimePickerProps.inputFormat ?? DEFAULT_FORMAT;
    const initialValue = useMemo(() => value || initialFocusedTime, [initialFocusedTime, value]) as
      | string
      | undefined;
    const parsedTime = useMemo(() => DateTime.fromFormat(initialValue ?? '', inputFormat), [
      initialValue,
      inputFormat,
    ]);
    const isValidTime = parsedTime.isValid;
    const [localValue, setLocalValue] = useState<DateTime | null>(
      isValidTime ? parsedTime : DateTime.now(),
    );

    const currentDate = new Date();

    const formatedDate = `${currentDate.getUTCFullYear()}-${
      currentDate.getUTCMonth() + 1
    }-${currentDate.getUTCDate()}T`;

    const setMaxTime = `${formatedDate}${maxTime || DEFAULT_MAX_TIME}`;
    const setMinTime = `${formatedDate}${minTime || DEFAULT_MIN_TIME}`;
    const InputProps = useMemo(
      () => ({
        style,
        css,
        className,
        error,
        ...otherTimePickerProps.InputProps,
      }),
      [style, css, className, error, otherTimePickerProps.InputProps],
    );

    const handleTimeChange = (time: unknown) => {
      setLocalValue(time as DateTime | null);
      onChange?.(time, (time as DateTime | null)?.toFormat(inputFormat));
    };

    const renderInputFunction =
      renderInput || (params => <TextField {...params} variant={inputVariant} />);

    const setViews = [
      hours ? 'hours' : '',
      minutes ? 'minutes' : '',
      seconds ? 'seconds' : '',
    ].filter(element => {
      return element !== '';
    });

    const setTimePicker = (timePickerType: string) => {
      switch (timePickerType) {
        case 'mobile': {
          return COMPONENTTYPES.MobileTimePicker;
        }
        case 'desktop': {
          return COMPONENTTYPES.DesktopTimePicker;
        }
        case 'static': {
          return COMPONENTTYPES.StaticTimePicker;
        }

        default:
          return COMPONENTTYPES.MuiTimePicker;
      }
    };

    const DynamicTimePicker = setTimePicker(responsiveness || 'default');

    return (
      <FormControl
        disabled={disabled}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={otherTimePickerProps.id}
        title={otherTimePickerProps.title}
        lang={otherTimePickerProps.lang}
        translate={otherTimePickerProps.translate as TranslateProp}
        className={className}
        onClick={otherTimePickerProps.onClick}
        onMouseOver={otherTimePickerProps.onMouseOver}
        onMouseOut={otherTimePickerProps.onMouseOut}
        onMouseDown={otherTimePickerProps.onMouseDown}
        onMouseUp={otherTimePickerProps.onMouseUp}
        onMouseEnter={otherTimePickerProps.onMouseEnter}
        onMouseLeave={otherTimePickerProps.onMouseLeave}
        onWheel={otherTimePickerProps.onWheel}
        onContextMenu={otherTimePickerProps.onContextMenu}
        onAuxClick={otherTimePickerProps.onAuxClick}
      >
        <DynamicTimePicker
          {...otherTimePickerProps}
          views={setViews as any}
          maxTime={dayjs(setMaxTime)}
          minTime={dayjs(setMinTime)}
          ampm={ampm}
          showToolbar={!!showToolbar}
          disabled={disabled}
          InputProps={InputProps}
          onChange={handleTimeChange}
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
