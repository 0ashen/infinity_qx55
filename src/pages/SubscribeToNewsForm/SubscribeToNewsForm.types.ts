import { FormikHelpers } from 'formik';
import { FORM_ERRORS } from '../../ENUMS/FORM_ERRORS';
import BooleanSchema, { RequiredBooleanSchema } from 'yup/lib/boolean';
import { RequiredStringSchema } from 'yup/lib/string';

export type SubscribeToNewsFormValues = {
    email: string;
    phone: string;
    last_name: string;
    first_name: string;
    acceptTerms: boolean;
};

export type FormSubmitErrorsType = {
    id: string;
    message: keyof typeof FORM_ERRORS;
};

export type SubscribeToNewsFormValuesValidate = Record<
    keyof SubscribeToNewsFormValues,
    | RequiredStringSchema<string | undefined, Record<string, any>>
    | RequiredBooleanSchema<boolean | undefined, Record<string, any>>
    | BooleanSchema<
          boolean | undefined,
          Record<string, any>,
          boolean | undefined
      >
>;
export type SubscribeToNewsSubmit = (
    values: SubscribeToNewsFormValues,
    formikHelpers: FormikHelpers<SubscribeToNewsFormValues>,
) => void;
