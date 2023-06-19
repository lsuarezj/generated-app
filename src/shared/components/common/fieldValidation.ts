export const regexValidation = (regex: RegExp, event: string): boolean => {
  const reg = new RegExp(regex);
  const validate = reg.test(event);
  return validate;
};

export const urlValidation = (url: string): boolean => {
  try {
    const validate = new URL(url);
    return !!validate;
  } catch (e) {
    return false;
  }
};

export const fieldValidation = (
  value: string,
  validation: string | undefined,
  regularExpression: RegExp | undefined,
): string | undefined => {
  let error;
  if (validation) {
    switch (validation) {
      case 'email': {
        const regexValue = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
        error = regexValidation(regexValue, value) ? undefined : 'Invalid email';
        break;
      }
      case 'url': {
        error = urlValidation(value) ? undefined : 'Invalid url';
        break;
      }
      case 'us phone number': {
        const regexValue = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/;
        error = regexValidation(regexValue, value) ? undefined : 'Invalid number';
        break;
      }
      case 'regular expression': {
        const regexValue = (regularExpression as unknown) as RegExp;
        error = regexValidation(regexValue, value) ? undefined : 'Invalid expression';
        break;
      }

      default: {
        error = undefined;
        break;
      }
    }
  }

  return error;
};
