import React, { forwardRef, useState } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { Select, SelectProps } from '../Select';
import { ComponentBasicProps } from '../types';

export type MultiselectProps = Omit<SelectProps, 'value'> &
  ComponentBasicProps & {
    value: unknown[];
  };

export const Multiselect = forwardRef<HTMLDivElement, MultiselectProps>(
  ({ multiple, value = [], onChange, ...otherMultiselectProps }, ref) => {
    const [localValue, setLocalValue] = useState<unknown[]>(value);

    const handleChange = (event: SelectChangeEvent<unknown[]>, children: React.ReactNode) => {
      setLocalValue(event.target.value as unknown[]);
      onChange?.(event, children);
    };

    return (
      <Select
        ref={ref}
        multiple
        value={localValue}
        onChange={handleChange}
        {...otherMultiselectProps}
      />
    );
  },
);
