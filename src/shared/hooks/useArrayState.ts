import React, { Fragment, useCallback, useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';

export const useArrayState = (defaultState: Array<unknown>) => {
  const [array, setArray] = useState<Array<unknown>>(defaultState);

  const shallowEqual = useCallback((itemA, itemB) => {
    const keys1 = Object.keys(itemA);
    const keys2 = Object.keys(itemB);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (itemA[key] !== itemB[key]) {
        return false;
      }
    }

    return true;
  }, []);

  const hasItemInArray = useCallback(
    (itemToFind: unknown): boolean => {
      const item = array.find((element) => shallowEqual(element, itemToFind));
      return item !== undefined;
    },
    [array, shallowEqual],
  );

  const insertItemInArray = useCallback(
    (itemToInsert: unknown) => {
      setArray([...array, itemToInsert]);
    },
    [array],
  );

  const removeItemFromArray = useCallback(
    (itemToFind: unknown) => {
      const withoutRemovedItem = array.filter(
        (element) => element !== itemToFind,
      );
      setArray(withoutRemovedItem);
    },
    [array],
  );

  return {
    value: array,
    setValue: setArray,
    hasItemInArray,
    insertItemInArray,
    removeItemFromArray,
  };
};
