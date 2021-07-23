import { FormikHelpers } from 'formik';
import { FORM_ERRORS } from '../../ENUMS/FORM_ERRORS';
import { RequiredBooleanSchema } from 'yup/lib/boolean';
import { RequiredStringSchema } from 'yup/lib/string';

export type BookingFormValues = {
    email: string;
    phone: string;
    last_name: string;
    first_name: string;
};

export type FormSubmitErrorsType = {
    id: string;
    message: keyof typeof FORM_ERRORS;
};

export type BookingFormValuesValidate = Record<
    keyof BookingFormValues,
    | RequiredStringSchema<string | undefined, Record<string, any>>
    | RequiredBooleanSchema<boolean | undefined, Record<string, any>>
>;
export type BookingSubmit = (
    values: BookingFormValues,
    formikHelpers: FormikHelpers<BookingFormValues>,
) => void;
