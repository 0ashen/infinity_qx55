import {
    Caption,
    Errors,
    InnerForm,
    SelectColorsWrapper,
    TestDriveFormWrapper,
    Title,
} from './BookingForm.styled';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../ui/Button/Button';
import Select, { OptionTypeBase } from 'react-select';
import React, { useState } from 'react';
import { UpsImage } from '../../ui/UpsImage/UpsImage';
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

const optionsExterior = [
    {
        value: 'black-obsidian',
        label: 'Black obsidian',
        hex: '#2e3134',
    },
    {
        value: 'dynamic-sunstone-red',
        label: 'Dynamic Sunstone Red',
        hex: '#ff0100',
    },
    {
        value: 'graphite-shadow',
        label: 'Graphite Shadow',
        hex: '#708090',
    },
    {
        value: 'hermosa-blue',
        label: 'Hermosa Blue',
        hex: '#000080',
    },
    {
        value: 'liquid-platinum',
        label: 'Liquid Platinum',
        hex: '#e9e8e9',
    },
    {
        value: 'majestic-white',
        label: 'Majestic White',
        hex: '#ecebf0',
    },
    {
        value: 'mineral-black',
        label: 'Mineral Black',
        hex: '#1f1e21',
    },
    {
        value: 'slate-gray',
        label: 'Slate Gray',
        hex: '#708090',
    },
];
const optionsInterior = [
    {
        value: 'white',
        label: 'White',
    },
    {
        value: 'black',
        label: 'Black',
    },
];
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

    const [exterior, setExterior] = useState<{
        selectedOption: { [key: string]: any } | null;
    }>({
        selectedOption: optionsExterior[0],
    });

    const handleChangeExterior = (selectedOption: OptionTypeBase | null) => {
        setExterior({ selectedOption });
    };

    const [interior, setInterior] = useState<{
        selectedOption: { [key: string]: any } | null;
    }>({
        selectedOption: optionsInterior[0],
    });
    const handleChangeInterior = (selectedOption: OptionTypeBase | null) => {
        setInterior({ selectedOption });
    };

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
        // setSubmitErrors();
        setSubmitting(false);
    };
    return (
        <TestDriveFormWrapper>
            <Logo />
            <InnerForm>
                <Title>Забронировать INFINITI QX55</Title>
                <Caption>
                    Выбирите комплектацию, цвет экстерьера и интерьера
                </Caption>
                <SelectColorsWrapper>
                    <div
                        className="item"
                        style={{ background: exterior.selectedOption?.hex }}
                    >
                        <Select
                            value={{ label: 'Цвет экстерьера' }}
                            onChange={handleChangeExterior}
                            options={optionsExterior}
                            isSearchable={false}
                            isClearable={false}
                            className="select-color"
                            classNamePrefix="select-color"
                        />
                        <UpsImage
                            imgSrc={`/images/qx55-colors/${exterior.selectedOption?.value}.png`}
                        />
                    </div>
                    <div className="item">
                        <Select
                            value={{ label: 'Цвет интерьера' }}
                            onChange={handleChangeInterior}
                            options={optionsInterior}
                            isSearchable={false}
                            isClearable={false}
                            className="select-color"
                            classNamePrefix="select-color"
                        />
                        <UpsImage
                            imgSrc={`/images/qx55-colors-interior/${interior.selectedOption?.value}.jpg`}
                        />
                    </div>
                </SelectColorsWrapper>
                {/*<Input placeholder="Имя" />*/}
                {/*<Input placeholder="Фамилия" />*/}
                {/*<Input placeholder="Номер телефона" />*/}
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
                                            <FormError
                                                text={
                                                    errors.email &&
                                                    touched.email &&
                                                    errors.email
                                                }
                                            />
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
