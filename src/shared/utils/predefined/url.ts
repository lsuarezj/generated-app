import qs from 'qs';
import { complement, filter, isNil } from 'ramda';
import { generatePath } from 'react-router-dom';

export type BuildUrlOptions = {
  queryParams?: { [key: string]: unknown };
  pathParams?: { [ley: string]: string | number | boolean | null | void };
  ignoreWorkspaceID?: boolean;
};

/**
 * Build url with query and path params.
 *
 * @example
 * buildUrl('/products/:id', { pathParams: { id: 123 }, queryParams: { filter: 'someFilter' } }) // "/products/123?filter=someFilter"
 */
export const buildUrl = (path: string, options: BuildUrlOptions = {}): string => {
  let query = '';
  if (options.queryParams) {
    const queryParamsString = qs.stringify(options.queryParams);
    query = queryParamsString.length > 0 ? `?${queryParamsString}` : '';
  }

  const filteredPathParams = filter(complement(isNil), options.pathParams ?? {}) as Record<
    string,
    string | number | boolean
  >;
  const generatedPath = generatePath(path, filteredPathParams);

  return `${generatedPath}${query}`;
};

/**
 *
 * @example
 * getParamsFromPath('/products/:id') -> ['id']
 */
export const getParamsFromPath = (path: string): string[] => {
  const params = path.match(/:(\w+)/g) || [];
  return params.map(el => el.replace(':', ''));
};

type ParamValue = string | number | boolean | null | void;
type ParamsType = Record<string, ParamValue> | undefined;

export const splitParams = (path: string, params: ParamsType = {}) => {
  const pathParamsKeys = getParamsFromPath(path);

  const pathParamsList = Object.entries(params)
    .map(([key, value]) => {
      if (typeof value === 'object' || Array.isArray(value)) {
        return null;
      }

      if (pathParamsKeys.includes(key)) {
        return [key, value];
      }

      return null;
    })
    .filter(el => Boolean(el)) as [string, ParamValue][];

  const queryParamsList = Object.entries(params)
    .map(([key, value]) => {
      if (typeof value === 'object' || Array.isArray(value)) {
        return [key, value];
      }

      if (pathParamsKeys.includes(key)) {
        return null;
      }

      return [key, value];
    })
    .filter(el => Boolean(el)) as [string, ParamValue][];

  return {
    pathParams: Object.fromEntries(pathParamsList),
    queryParams: Object.fromEntries(queryParamsList),
  };
};
