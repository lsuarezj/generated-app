import { FieldProps } from 'formik';

export const getIsInvalid = ({ meta, form }: Pick<FieldProps, 'meta' | 'form'>): boolean => {
  return !form.isValid && form.submitCount > 0 && Boolean(meta.error);
};
