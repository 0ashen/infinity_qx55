import {
    Caption,
    Errors,
    InnerForm,
    TestDriveFormWrapper,
    Title,
} from './BookingForm.styled';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../ui/Button/Button';
import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import {
    BookingFormValues,
    BookingFormValuesValidate,
    BookingSubmit,
    FormSubmitErrorsType,
} from './BookingForm.types';
import { FORM_HINTS } from '../../ENUMS/FORM_HINTS';
import { Input } from '../../ui/Input/Input';
import { FORM_ERRORS } from '../../ENUMS/FORM_ERRORS';
import MaskedInput from 'react-text-mask';
import { FormError } from '../../ui/FormError/FormError';
import { CarStyle } from './children/CarStyle/CarStyle';
import axios from 'axios';

const phoneNumberMask = [
    '8',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
];
export const BookingForm = () => {
    const [submitErrors, setSubmitErrors] = useState<
        FormSubmitErrorsType[] | null
    >();

    const validateValues: BookingFormValuesValidate = {
        email: Yup.string()
            .email(FORM_HINTS.invalidEmail)
            .required(FORM_HINTS.required),
        phone: Yup.string().required('Required'),
        name: Yup.string()
            .max(30, FORM_HINTS.lengthError)
            .required(FORM_HINTS.required),
        surname: Yup.string()
            .max(30, FORM_HINTS.lengthError)
            .required(FORM_HINTS.required),
    };
    const initialValues: BookingFormValues = {
        email: '',
        phone: '',
        surname: '',
        name: '',
    };
    const onSubmit: BookingSubmit = async (values, { setSubmitting }) => {
        // axios()
        console.log(values);
        // setSubmitErrors();
        setSubmitting(false);
    };
    return (
        <TestDriveFormWrapper>
            <Logo />
            <InnerForm as={'div'}>
                <Title>Забронировать INFINITI QX55</Title>
                <Caption>
                    Выбирите комплектацию, цвет экстерьера и интерьера
                </Caption>
                <Formik
                    validationSchema={Yup.object(validateValues)}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {(props) => {
                        const {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        } = props;
                        return (
                            <InnerForm onSubmit={handleSubmit}>
                                <CarStyle />
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Имя"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    error={
                                        errors.name &&
                                        touched.name &&
                                        errors.name
                                    }
                                />
                                <Input
                                    type="text"
                                    name="surname"
                                    placeholder="Фамилия"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.surname}
                                    error={
                                        errors.surname &&
                                        touched.surname &&
                                        errors.surname
                                    }
                                />
                                <Field
                                    name="phone"
                                    render={({ field }: any) => (
                                        <div
                                            className={
                                                'text-input-phone-wrapper'
                                            }
                                        >
                                            <MaskedInput
                                                {...field}
                                                mask={phoneNumberMask}
                                                id="phone"
                                                placeholder="Телефон"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={'text-input-phone'}
                                            />
                                            {(errors.phone ||
                                                touched.phone ||
                                                errors.phone) && (
                                                <FormError
                                                    text={
                                                        errors.email &&
                                                        touched.email &&
                                                        errors.email
                                                    }
                                                />
                                            )}
                                        </div>
                                    )}
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Электронная почта"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={
                                        errors.email &&
                                        touched.email &&
                                        errors.email
                                    }
                                />
                                <Errors>
                                    {submitErrors &&
                                        submitErrors.length &&
                                        submitErrors.map((el, idx) => (
                                            <p key={idx}>
                                                {FORM_ERRORS[el.message]}
                                            </p>
                                        ))}
                                </Errors>
                                <Button type="submit" disabled={isSubmitting}>
                                    Записаться на тест-драйв
                                </Button>
                            </InnerForm>
                        );
                    }}
                </Formik>
            </InnerForm>
        </TestDriveFormWrapper>
    );
};
