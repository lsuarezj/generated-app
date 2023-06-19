import React, { forwardRef, useState, useEffect, useRef, CSSProperties } from 'react';

import { SerializedStyles } from '@emotion/react';
import {
  FormControlProps,
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
  TextField,
} from '@mui/material';
import { nanoid as uuid } from 'nanoid';

import { ComponentBasicProps } from '../types';

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export type AutocompleteProps = ComponentBasicProps &
  Omit<
    MuiAutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined>,
    'ref'
  > & {
    'data-test'?: string;
    'data-node-id'?: string;
    'data-node-render-path'?: string;
  } & Pick<FormControlProps, 'variant' | 'size'> & {
    label?: React.ReactNode;
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    css?: SerializedStyles;
    name?: string;
    className?: string;
    title?: string;
    lang?: string;
    translate?: string;
  } & {
    onChange?: (
      event: React.ChangeEvent<Record<string, unknown>>,
      value: unknown,
      reason?: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<unknown>,
    ) => void;
  };

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      disabled,
      label,
      className,
      error,
      helperText,
      variant,
      size,
      value,
      open,
      name,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      id,
      title,
      lang,
      translate,
      ...otherAutocompleteProps
    },
    ref,
  ) => {
    const previousValue = usePrevious(open);
    const [inputKey, setInputKey] = useState(() => uuid(8));

    useEffect(() => {
      // we check the moment when a component is changing
      // the controlled open state of Autocomplete to be
      // uncontrolled and update inputKey to force remounting on React component.
      if (
        (previousValue === undefined && open !== undefined) ||
        (open === undefined && previousValue !== undefined)
      ) {
        setInputKey(uuid(8));
      }
    }, [open, previousValue]);
    return (
      <MuiAutocomplete
        {...otherAutocompleteProps}
        size={size}
        key={inputKey}
        className={className}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={id}
        title={title}
        lang={lang}
        translate={translate}
        value={value}
        renderInput={params => (
          <TextField
            {...params}
            disabled={disabled}
            label={label}
            variant={variant}
            name={name}
            error={error}
            helperText={helperText}
            inputProps={{
              autoComplete: 'new-password',
              ...params.inputProps,
              title,
              lang,
              translate,
            }}
          />
        )}
        open={open}
      />
    );
  },
);
