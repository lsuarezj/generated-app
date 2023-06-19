import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useRef,
  useState,
  useEffect,
  CSSProperties,
} from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { isNil } from 'ramda';

import { fieldValidation } from '../common';
import { ComponentBasicProps, ComponentDataProps } from '../types';

export type TextFieldProps = Omit<MuiTextFieldProps, 'InputProps'> &
  ComponentDataProps &
  ComponentBasicProps & {
    debounce?: number;
    style?: CSSProperties;
    css?: SerializedStyles;
    classes?: Record<string, unknown>;
    className?: string;
    InputProps?: MuiTextFieldProps['InputProps'] & {
      style?: CSSProperties;
      css?: SerializedStyles;
      classes?: Record<string, unknown>;
      className?: string;
    };
    helperText?: string;
    helperErrorText?: string;
    regularExpression?: RegExp;
    validation?: string;
    error?: boolean;
  };

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      debounce: debounceTime,
      onChange,
      value,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      lang,
      translate,
      InputProps = {},
      helperText,
      helperErrorText,
      regularExpression,
      validation,
      error,
      ...rest
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = useState<string>(value as string);
    const createDebounceCallback = useCallback(
      (debounceTimeArg?: number) => {
        return debounce(
          (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, nextValue: string) => {
            // eslint-disable-next-line no-param-reassign
            event.target.value = nextValue;
            onChange?.(event);
          },
          debounceTimeArg,
        );
      },
      [onChange],
    );

    useEffect(() => {
      setLocalValue(value as string);
    }, [value]);

    const shrinkLabel = ['date', 'time', 'color', 'month', 'datetime-local', 'week'].includes(
      rest.type as string,
    );
    const [errorType, setErrorType] = useState(false);

    const handleValidation = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const validate = fieldValidation(event.target.value, validation, regularExpression);
      setErrorType(!!validate);
    };

    const debouncedChangePropValue = useRef(createDebounceCallback(debounceTime));

    useEffect(() => {
      debouncedChangePropValue.current = createDebounceCallback(debounceTime);
    }, [createDebounceCallback, debounceTime]);

    const setDebouncedValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setLocalValue(event.target.value);

      if (isNil(debounceTime)) {
        onChange?.(event);
      } else {
        debouncedChangePropValue.current(event, event.target.value);
      }
    };

    const {
      startAdornment: initialStartAdornment,
      endAdornment: initialEndAdornment,
      ...restInputProps
    } = InputProps;

    // I'm not sure if it's necessary but this is the way how
    // They add adornments in the TextFields (In the documentation)
    // https://material-ui.com/components/text-fields/#icons
    const startAdornment = initialStartAdornment && (
      <InputAdornment position="start">{initialStartAdornment}</InputAdornment>
    );
    const endAdornment = initialEndAdornment && (
      <InputAdornment position="end">{initialEndAdornment}</InputAdornment>
    );

    return (
      <MuiTextField
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={id}
        title={title}
        lang={lang}
        translate={translate}
        error={errorType || error}
        helperText={errorType ? helperErrorText : helperText}
        InputLabelProps={{ shrink: shrinkLabel ? true : undefined }}
        InputProps={{
          startAdornment,
          endAdornment,
          ...restInputProps,
        }}
        {...rest}
        value={localValue}
        onChange={event => {
          handleValidation(event);
          setDebouncedValue(event);
        }}
      />
    );
  },
);
