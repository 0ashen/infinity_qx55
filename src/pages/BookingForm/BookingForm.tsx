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
import ReactGA from 'react-ga';
import dealers from '../../data/bookingForm.json';

const phoneNumberMask = [
    "8",
    "(",
    /[1-6,9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
];
export const BookingForm: VFC<RouteComponentProps<any>> = ({ history }) => {
    const [submitErrors, setSubmitErrors] = useState<FormSubmitErrorsType[] | null>();
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
        phone: Yup.string()
            .transform((value) => value.replace(/[^\d]/g, ''))
            .min(11, FORM_HINTS.required)
            .required(FORM_HINTS.required),
        first_name: Yup.string()
            .max(30, FORM_HINTS.lengthError)
            .required(FORM_HINTS.required),
        last_name: Yup.string()
            .max(30, FORM_HINTS.lengthError)
            .required(FORM_HINTS.required),
        acceptTerms: Yup.bool().oneOf([true], FORM_HINTS.required),
        city: Yup.object().shape({
            label: Yup.string().required(FORM_HINTS.required),
            value: Yup.string().required(FORM_HINTS.required),
        }),
        dialer: Yup.object()
            .shape({
                label: Yup.string().required(FORM_HINTS.required),
                value: Yup.string().required(FORM_HINTS.required),
            })
            .nullable(true)
            .required(FORM_HINTS.required),
    };
    const initialValues: BookingFormValues = {
        email: '',
        phone: '',
        last_name: '',
        first_name: '',
        acceptTerms: false,
        city: dealers[0],
        dialer: null,
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
                dealer_code: values.dialer?.value,
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
            .then(function(response) {
                ReactGA.event({
                    category: 'form',
                    action: 'send_book',
                });
                setSubmitting(false);
                resetForm();
                store.addNotification({
                    title: 'Успешно!',
                    message: 'Ваша заявка на бронирование была отправлена!',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                    },
                });
            })
            .catch(function(error) {
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
                    Укажите ваши пожелания по комплектации, цвету экстерьера и
                    интерьера:
                </Caption>
                <Formik
                    validationSchema={Yup.object(validateValues).nullable(true)}
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
                            <InnerForm onSubmit={handleSubmit} id="book_form">
                                <CarStyle
                                    accumulateDataToObject={carStyle}
                                    {...props}
                                />
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
                                                        errors.phone &&
                                                        touched.phone &&
                                                        errors.phone
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
                                            INFINITI *
                                        </label>
                                    </div>

                                    <ErrorMessage
                                        name="acceptTerms"
                                        component="div"
                                        className="acceptTerms__error"
                                    />
                                </AcceptTerms>
                                <Button type="submit" disabled={isSubmitting}>
                                    Забронировать
                                </Button>
                                <div className="legal-inforamtion">
                                    <p>
                                        1 Рекомендованная розничная цена на
                                        автомобиль INFINITI QX55 указанной
                                        комплектации 2021 года выпуска.
                                        Увеличение рекомендованной розничной
                                        цены за цвет металлик (кроме QM1/КУМ1,
                                        KH3/КХ3) составляет 60 000 рублей,
                                        включая НДС, за цвет специальный
                                        металлик Dynamic Sunstone Red/Динамичный
                                        Красный составляет 80 000 рублей,
                                        включая НДС Предложение ограничено, не
                                        является офертой и действует до 30 сентября
                                        2021 г. Подробности у официальных
                                        дилеров.
                                    </p>

                                    <p>
                                        * Настоящим я выражаю свое безусловное
                                        согласие ООО «Ниссан Мэнуфэкчуринг РУС»
                                        (далее - «Общество») на обработку
                                        вышеуказанных персональных данных с
                                        использованием и без использования
                                        средств автоматизации, включая их
                                        передачу, в том числе трансграничную,
                                        компаниям группы Nissan, авторизованным
                                        дилерам Nissan/Infiniti/Datsun, а также
                                        организациям, с которыми Общество
                                        осуществляет взаимодействие на основании
                                        соответствующих договоров и соглашений
                                        (информацию о третьих лицах
                                        (наименование и адрес лица) Вы можете
                                        уточнить путем запроса у Общества), в
                                        составе, необходимом для достижения
                                        следующих целей: хранения в
                                        информационных системах для оптимизации
                                        процессов взаимодействия; доставки
                                        заказанного товара, послепродажного
                                        обслуживания товара, уведомления о
                                        сервисных и отзывных кампаниях;
                                        осуществления контроля продаж и
                                        обслуживания покупателей; технической
                                        поддержки информационных систем;
                                        статистических и аналитических целей;
                                        проведения маркетинговых исследований.
                                        Настоящее согласие действует в течение
                                        25 лет со дня его подписания. Я
                                        уведомлен о том, что в соответствии со
                                        статьей 9 Федерального закона от
                                        27.07.2006 г. № 152-ФЗ «О персональных
                                        данных» настоящее согласие может быть
                                        отозвано мной путем направления в
                                        письменной форме уведомления Обществу
                                        заказным почтовым отправлением с описью
                                        вложения по адресу: 194362, г.
                                        Санкт-Петербург, пос. Парголово,
                                        Комендантский проспект, д.140, либо
                                        вручения лично под подпись
                                        уполномоченным представителям Общества.
                                        Настоящим я также подтвержадю, что
                                        согласен получать информацию о товарах,
                                        услугах и мероприятиях с помощью средств
                                        связи (интернет, смс, телефонных
                                        звонков, почты). Обработка персональных
                                        данных осуществляется в соответствии с
                                        Политикой в области обработки и защиты
                                        персональных данных
                                    </p>
                                </div>
                            </InnerForm>
                        );
                    }}
                </Formik>
            </InnerForm>
        </TestDriveFormWrapper>
    );
};
