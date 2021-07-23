import {
    Errors,
    InnerForm,
    SubscribeToNewsFormWrapper,
    Title,
} from './SubscribeToNewsForm.styled';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../ui/Button/Button';
import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import {
    FormSubmitErrorsType,
    SubscribeToNewsFormValues,
    SubscribeToNewsFormValuesValidate,
    SubscribeToNewsSubmit,
} from './SubscribeToNewsForm.types';
import { FORM_HINTS } from '../../ENUMS/FORM_HINTS';
import { Input } from '../../ui/Input/Input';
import { FORM_ERRORS } from '../../ENUMS/FORM_ERRORS';
import MaskedInput from 'react-text-mask';
import { FormError } from '../../ui/FormError/FormError';
import qs from 'qs';
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
export const SubscribeToNewsForm = () => {
    const [submitErrors, setSubmitErrors] = useState<
        FormSubmitErrorsType[] | null
    >();

    const validateValues: SubscribeToNewsFormValuesValidate = {
        email: Yup.string()
            .email(FORM_HINTS.invalidEmail)
            .required(FORM_HINTS.required),
        phone: Yup.string().required('Required'),
        first_name: Yup.string()
            .max(30, FORM_HINTS.lengthError)
            .required(FORM_HINTS.required),
        last_name: Yup.string()
            .max(30, FORM_HINTS.lengthError)
            .required(FORM_HINTS.required),
    };
    const initialValues: SubscribeToNewsFormValues = {
        email: '',
        phone: '',
        last_name: '',
        first_name: '',
    };
    const onSubmit: SubscribeToNewsSubmit = (values, { setSubmitting }) => {
        axios({
            method: 'post',
            url: 'https://form.infiniti.ru/iframe/form_submit.php',
            data: qs.stringify({
                action: 'send_form',
                ...values,
                request_type_id: 218,
                client_confirm_communication: 1,
                title_form: 'Подписка на новости QX55',
                'subscription_ids[]': 2
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json, text/javascript, */*; q=0.01',
            },
        })
            .then(function (response) {
                setSubmitting(false);
            })
            .catch(function (error) {
                setSubmitErrors(error);
            });
    };
    return (
        <SubscribeToNewsFormWrapper>
            <Logo />
            <InnerForm as={'div'}>
                <Title>Подписка на новости</Title>
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
                                <Input
                                    type="text"
                                    name="first_name"
                                    placeholder="Имя"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name}
                                    error={
                                        errors.first_name &&
                                        touched.first_name &&
                                        errors.first_name
                                    }
                                />
                                <Input
                                    type="text"
                                    name="last_name"
                                    placeholder="Фамилия"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                    error={
                                        errors.last_name &&
                                        touched.last_name &&
                                        errors.last_name
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
                                    Отправить
                                </Button>
                            </InnerForm>
                        );
                    }}
                </Formik>
            </InnerForm>
        </SubscribeToNewsFormWrapper>
    );
};
