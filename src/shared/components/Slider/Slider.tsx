import React, {
  CSSProperties,
  ChangeEvent,
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  SliderProps as MaterialSliderProps,
  FormControlLabel,
  FormControlLabelProps,
  Slider as MaterialSlider,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { isNil } from 'ramda';

import { fieldValidation } from '../common';
import { ComponentDataProps } from '../types';

export type SliderProps = Omit<MaterialSliderProps, 'ref' | 'error'> &
  ComponentDataProps &
  Pick<FormControlLabelProps, 'label' | 'labelPlacement'> &
  Pick<FormControlProps, 'variant' | 'size'> & {
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
  } & {
    validation?: string;
    regularExpression?: RegExp;
    debounce?: number;
    arialabel: string;
    arialabelledby: string;
    ariavaluetext: string;
    classes: Record<string, unknown>;
    track: string;
    valueLabelDisplay: string;
    defaultValue: string;
    marks: [];
    step: string;
    orientation: string;
    sx: string;
    disableSwap: boolean;
    getAriaLabel: string;
    getAriaValueText: string;
    scale: number;
    tabIndex: string;
    valueLabelFormat: string;
  };

// why should we use such a weird styles there?
// by default Material-UI has negative marginLeft value and this component falls out its parent
// on the left side if it has the prop "size" equals to "small"
// so to avoid such weird behaviour we set marginLeft equals to "-6px"
const SMALL_SIZE_STYLES = {
  marginLeft: '-6px',
};

function createObjectFromCssString(stringValue: string) {
  const separator = stringValue?.includes(';') ? ';' : ',';
  let finalObject = {};
  if (stringValue)
    stringValue
      .slice(1, -1)
      .toString()
      .split(separator)
      // eslint-disable-next-line array-callback-return
      .map((stringElement: string) => {
        const key = stringElement.split(':')[0]?.replace(/\s+/g, '');
        const sxValue = stringElement.split(':')[1]?.replace(/'|\s+/g, '');
        finalObject = {
          ...finalObject,
          [key]: sxValue,
        };
      });

  return finalObject;
}

function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
  }
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      debounce: debounceTime,
      id,
      title,
      translate,
      disabled,
      className,
      style,
      sx,
      css,
      error,
      helperText,
      size,
      name,
      lang,
      color,
      value,
      defaultValue,
      min,
      max,
      arialabel,
      arialabelledby,
      ariavaluetext,
      classes,
      valueLabelDisplay,
      disableSwap,
      track,
      marks,
      step,
      orientation,
      getAriaLabel,
      getAriaValueText,
      tabIndex,
      onChange,
      valueLabelFormat,
      scale,
      validation,
      regularExpression,
      label: initLabel = '',
      labelPlacement = 'end',
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      ...otherSliderProps
    },
    ref,
  ) => {
    const label = Array.isArray(initLabel) ? initLabel[0] : initLabel;
    const [localValue, setLocalValue] = useState<number | number[] | undefined>(
      value,
    );
    const [isFirstLoad, setIsFirstLoad] = useState(false);
    const [errorType, setErrorType] = useState(false);

    useEffect(() => {
      if (defaultValue && !isFirstLoad) {
        setIsFirstLoad(true);
        onChange?.(
          ({
            target: {
              value: Number(defaultValue),
            },
          } as unknown) as Event,
          defaultValue,
          0,
        );
      }
    }, [setIsFirstLoad, onChange, defaultValue, isFirstLoad]);

    useEffect(() => {
      setLocalValue(value);
    }, [value, setLocalValue]);

    const createDebounceCallback = useCallback(
      (debounceTimeArg?: number) => {
        return debounce(
          (
            event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
            nextValue: string,
          ) => {
            // eslint-disable-next-line no-param-reassign
            event.target.value = nextValue;
            onChange?.(
              (event as unknown) as Event,
              (event.target.value as unknown) as number,
              (event.target.value as unknown) as number,
            );
          },
          debounceTimeArg,
        );
      },
      [onChange],
    );

    const debouncedChangePropValue = useRef(
      createDebounceCallback(debounceTime),
    );

    const setDebouncedValue = (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
      const sliderValue = (event.target.value as unknown) as number;
      setLocalValue(sliderValue);

      if (isNil(debounceTime)) {
        onChange?.((event as unknown) as Event, sliderValue, sliderValue);
      } else {
        debouncedChangePropValue.current(event, event.target.value);
      }
    };

    const handleValidation = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
      const validate = fieldValidation(
        event.target.value,
        validation,
        regularExpression,
      );
      setErrorType(!!validate);
    };

    const sxObject = createObjectFromCssString(sx);
    // eslint-disable-next-line no-new-func
    const formatLabel = new Function('value', valueLabelFormat);
    return (
      <FormControl
        size={size}
        sx={{ width: 200, marginLeft: '20px' }}
        disabled={disabled}
        className={className}
        style={style}
        css={css}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        title={title}
        id={id}
        lang={lang}
        translate={translate}
      >
        <FormControlLabel
          disabled={disabled}
          label={label}
          labelPlacement={labelPlacement}
          disableTypography
          sx={size === 'small' ? SMALL_SIZE_STYLES : undefined}
          control={
            <MaterialSlider
              {...otherSliderProps}
              size={size}
              value={localValue}
              min={min}
              max={max}
              onChange={(event) => {
                handleValidation(
                  (event as unknown) as ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                );
                setDebouncedValue(
                  (event as unknown) as ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                );
              }}
              scale={(actualValue) => actualValue * Number(scale || 1)}
              arial-label={arialabel}
              aria-labelledby={arialabelledby}
              aria-valuetext={ariavaluetext}
              color={color}
              marks={marks}
              classes={classes}
              valueLabelDisplay={valueLabelDisplay}
              track={track !== 'normal' && track !== 'inverted' ? false : track}
              step={parseInt(step, 10)}
              tabIndex={parseInt(tabIndex, 10) || 0}
              name={name}
              sx={{
                ...sxObject,
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              disableSwap={disableSwap}
              orientation={orientation}
              getAriaLabel={() => getAriaLabel}
              valueLabelFormat={
                valueLabelFormat
                  ? (valueToFormat) => formatLabel(valueToFormat)
                  : (valueToFormat) => `${valueToFormat}`
              }
              getAriaValueText={(labelvalue) =>
                getAriaValueText
                  ? `${labelvalue}${getAriaValueText}`
                  : ariavaluetext || ''
              }
              onKeyDown={preventHorizontalKeyboardNavigation}
            />
          }
        />
        {helperText && (
          <FormHelperText error={errorType || error}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);
