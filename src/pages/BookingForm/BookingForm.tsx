import {
    Caption,
    Errors,
    InnerForm,
    TestDriveFormWrapper,
    Title,
} from './BookingForm.styled';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../ui/Button/Button';
import React, { useEffect, useRef, useState, VFC } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
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
import qs from 'qs';
import axios from 'axios';

// data
import optionsExterior from '../../data/exterior.json';
import optionsInterior from '../../data/interior.json';
import models from '../../data/models.json';
import { changePage } from '../../utils/changePage';
import { ROUTES_PATHS } from '../../App';
import { RouteComponentProps } from 'react-router-dom';
import { gsap } from 'gsap';
import { AcceptTerms } from '../SubscribeToNewsForm/SubscribeToNewsForm.styled';
import { store } from 'react-notifications-component';

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
export const BookingForm: VFC<RouteComponentProps<any>> = ({ history }) => {
    const [submitErrors, setSubmitErrors] = useState<
        FormSubmitErrorsType[] | null
    >();
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
    });
    const validateValues: BookingFormValuesValidate = {
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
        acceptTerms: Yup.bool().oneOf(
            [true],
            'СОГЛАСИЕ НА ПОЛУЧЕНИЕ ИНФОРМАЦИИ Обязятельно',
        ),
    };
    const initialValues: BookingFormValues = {
        email: '',
        phone: '',
        last_name: '',
        first_name: '',
        acceptTerms: false,
    };
    const carStyle = {
        exterior: 0,
        interior: 0,
        model: 0,
    };
    const onSubmit: BookingSubmit = (values, { setSubmitting, resetForm }) => {
        axios({
            method: 'post',
            url: 'https://form.infiniti.ru/iframe/form_submit.php',
            data: qs.stringify({
                action: 'send_form',
                ...values,
                comment: [
                    models[carStyle.model].title,
                    optionsExterior[carStyle.exterior].colorSubTitle,
                    optionsInterior[carStyle.interior].label,
                ].join(','),
                request_type_id: 221,
                client_confirm_communication: 1,
                title_form: 'Забронировать QX55',
                model: 'QX55',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json, text/javascript, */*; q=0.01',
            },
        })
            .then(function (response) {
                setSubmitting(false);
                resetForm();
                store.addNotification({
                    title: 'Успешно!',
                    message:
                        'Ваша заявка на бронирование бала отправлна!',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                });
            })
            .catch(function (error) {
                setSubmitErrors(error);
            });
    };
    return (
        <TestDriveFormWrapper ref={containerWrapper}>
            <Logo
                getBack={{
                    title: 'В город',
                    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        changePage(
                            e,
                            ROUTES_PATHS.NAVIGATION,
                            timeline,
                            history,
                        );
                    },
                }}
            />
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
                                <CarStyle accumulateDataToObject={carStyle} />
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
                                <AcceptTerms>
                                    <div className="inner">
                                        <Field
                                            type="checkbox"
                                            name="acceptTerms"
                                            id="acceptTerms"
                                            className={
                                                'form-check-input ' +
                                                (errors.acceptTerms &&
                                                touched.acceptTerms
                                                    ? ' is-invalid'
                                                    : '')
                                            }
                                        />

                                        <label
                                            htmlFor="acceptTerms"
                                            className="form-check-label"
                                        >
                                            СОГЛАСИЕ НА ПОЛУЧЕНИЕ ИНФОРМАЦИИ ОТ
                                            INFINITI
                                        </label>
                                    </div>

                                    <ErrorMessage
                                        name="acceptTerms"
                                        component="div"
                                        className="acceptTerms__error"
                                    />
                                </AcceptTerms>
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
