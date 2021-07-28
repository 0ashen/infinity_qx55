import { GroupTypeBase } from 'react-select';
import { FormikErrors, FormikTouched } from 'formik';

export type InfinitiSelectProps = {
    caption: string;
    error?:
        | FormikErrors<{ value: string; label: string }>
        | FormikErrors<{ value: string; label: string }>[]
        | string
        | string[];
    touched?:
        | FormikTouched<{ value: string; label: string }>
        | FormikTouched<{ value: string; label: string }>[]
        | boolean;
    value?: { value: string; label: string } | null;
    defaultValue?: { value: string; label: string };
    onChange: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => void;
    resetName?: string;
    onBlur: (
        field: string,
        isTouched?: boolean | undefined,
        shouldValidate?: boolean | undefined,
    ) => void;
    options: readonly (
        | { value: string; label: string }
        | GroupTypeBase<{ value: string; label: string }>
    )[];
    name: string;
    placeholder: string;
};
