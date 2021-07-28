import { FormikHelpers } from 'formik';
import { FORM_ERRORS } from '../../ENUMS/FORM_ERRORS';
import BooleanSchema from 'yup/lib/boolean';
import { RequiredStringSchema } from 'yup/lib/string';
import { ObjectSchema } from 'yup';
import { Assign, ObjectShape } from 'yup/lib/object';

export type ClosedShowFormValues = {
    email: string;
    phone: string;
    last_name: string;
    first_name: string;
    acceptTerms: boolean;
    city: {
        value: string;
        label: string;
    };
    dialer: {
        value: string;
        label: string;
    } | null;
};

export type FormSubmitErrorsType = {
    id: string;
    message: keyof typeof FORM_ERRORS;
};

export type ClosedShowFormValuesValidate = {
    email: RequiredStringSchema<string | undefined, Record<string, any>>;
    phone: RequiredStringSchema<string | undefined, Record<string, any>>;
    last_name: RequiredStringSchema<string | undefined, Record<string, any>>;
    first_name: RequiredStringSchema<string | undefined, Record<string, any>>;
    acceptTerms: BooleanSchema<
        boolean | undefined,
        Record<string, any>,
        boolean | undefined
    >;
    dialer: ObjectSchema<
        Assign<
            ObjectShape,
            {
                label: RequiredStringSchema<
                    string | null | undefined,
                    Record<string, any>
                >;
                value: RequiredStringSchema<
                    string | null | undefined,
                    Record<string, any>
                >;
            }
        >,
        Record<symbol, boolean>
    >;
    city: ObjectSchema<
        Assign<
            ObjectShape,
            {
                label: RequiredStringSchema<
                    string | null | undefined,
                    Record<string, any>
                >;
                value: RequiredStringSchema<
                    string | null | undefined,
                    Record<string, any>
                >;
            }
        >,
        Record<symbol, boolean>
    >;
};
export type ClosedShowSubmit = (
    values: ClosedShowFormValues,
    formikHelpers: FormikHelpers<ClosedShowFormValues>,
) => void;
