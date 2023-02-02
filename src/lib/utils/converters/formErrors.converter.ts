// TODO: ADD TYPES
/**
 * Make the first letter of the form field name lowercase.
 * (Timers api returns field namaes with the first letter capitalized)
 */
export function formErrorsConverter(errors: any) : any{
  if(!errors) return {};

  const formattedFormErrors: any = {};

  Object.keys(errors).forEach((key: string) => {
    formattedFormErrors[key.charAt(0).toLowerCase() + key.slice(1)] = errors[key];
  });

  return formattedFormErrors;
}