import { FormikProps } from 'formik';

export type CarStyleProps<Values> = {
    accumulateDataToObject: {
        exterior: number;
        interior: number;
        model: number;
    };
} & FormikProps<Values>;

export type sliderItem = {
    title: string;
    price: string;
    advantages: string[];
};
