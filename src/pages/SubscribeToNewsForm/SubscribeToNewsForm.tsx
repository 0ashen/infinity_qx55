import { AcceptTerms, Errors, InnerForm, SubscribeToNewsFormWrapper, Title } from './SubscribeToNewsForm.styled';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../ui/Button/Button';
import React, { useEffect, useRef, useState, VFC } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
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
import { changePage } from '../../utils/changePage';
import { ROUTES_PATHS } from '../../App';
import { gsap } from 'gsap';
import { RouteComponentProps } from 'react-router-dom';
import { store } from 'react-notifications-component';
import ReactGA from 'react-ga';

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
export const SubscribeToNewsForm: VFC<RouteComponentProps<any>> = ({
                                                                       history,
                                                                   }) => {
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
    });
    const [submitErrors, setSubmitErrors] = useState<FormSubmitErrorsType[] | null>();

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
        acceptTerms: Yup.bool().oneOf(
            [true],
            'СОГЛАСИЕ НА ПОЛУЧЕНИЕ ИНФОРМАЦИИ Обязятельно',
        ),
    };
    const initialValues: SubscribeToNewsFormValues = {
        email: '',
        phone: '',
        last_name: '',
        first_name: '',
        acceptTerms: false,
    };
    const onSubmit: SubscribeToNewsSubmit = (
        values,
        { setSubmitting, resetForm },
    ) => {
        axios({
            method: 'post',
            url: 'https://form.infiniti.ru/iframe/form_submit.php',
            data: qs.stringify({
                action: 'send_form',
                ...values,
                request_type_id: 218,
                client_confirm_communication: 1,
                title_form: 'Подписка на новости QX55',
                'subscription_ids[]': 2,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json, text/javascript, */*; q=0.01',
            },
        })
            .then(function(response) {
                ReactGA.event({
                    category: 'form',
                    action: 'news_form'
                });
                setSubmitting(false);
                resetForm();
                store.addNotification({
                    title: 'Успешно!',
                    message:
                        'Ваша заявка на подписку была отправлена!',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                });
            })
            .catch(function(error) {
                setSubmitErrors(error);
            });
    };
    return (
        <SubscribeToNewsFormWrapper ref={containerWrapper}>
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
                            <InnerForm onSubmit={handleSubmit} id="news_form">
                                <Input
                                    type='text'
                                    name='first_name'
                                    placeholder='Имя'
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
                                    type='text'
                                    name='last_name'
                                    placeholder='Фамилия'
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
                                    name='phone'
                                    render={({ field }: any) => (
                                        <div
                                            className={
                                                'text-input-phone-wrapper'
                                            }
                                        >
                                            <MaskedInput
                                                {...field}
                                                mask={phoneNumberMask}
                                                id='phone'
                                                placeholder='Телефон'
                                                type='text'
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
                                    type='email'
                                    name='email'
                                    placeholder='Электронная почта'
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
                                    <div className='inner'>
                                        <Field
                                            type='checkbox'
                                            name='acceptTerms'
                                            id='acceptTerms'
                                            className={
                                                'form-check-input ' +
                                                (errors.acceptTerms &&
                                                touched.acceptTerms
                                                    ? ' is-invalid'
                                                    : '')
                                            }
                                        />

                                        <label
                                            htmlFor='acceptTerms'
                                            className='form-check-label'
                                        >
                                            СОГЛАСИЕ НА ПОЛУЧЕНИЕ ИНФОРМАЦИИ ОТ
                                            INFINITI *
                                        </label>
                                    </div>

                                    <ErrorMessage
                                        name='acceptTerms'
                                        component='div'
                                        className='acceptTerms__error'
                                    />
                                </AcceptTerms>
                                <Button type='submit' disabled={isSubmitting}>
                                    Отправить
                                </Button>
                                <div className='legal-inforamtion'>
                                    1 Рекомендованная розничная цена на автомобиль INFINITI QX55 указанной комплектации
                                    2021 года выпуска. Увеличение рекомендованной розничной цены за цвет металлик (кроме
                                    QM1/КУМ1, KH3/КХ3) составляет 60 000 рублей, включая НДС, за цвет специальный
                                    металлик Dynamic Sunstone Red/Динамичный Красный составляет 80 000 рублей, включая
                                    НДС Предложение ограничено, не является офертой и действует до 31 июля 2021 г.
                                    Подробности у официальных дилеров.

                                    * Настоящим я выражаю свое безусловное согласие ООО «Ниссан Мэнуфэкчуринг РУС»
                                    (далее - «Общество») на обработку вышеуказанных персональных данных с использованием
                                    и без использования средств автоматизации, включая их передачу, в том числе
                                    трансграничную, компаниям группы Nissan, авторизованным дилерам
                                    Nissan/Infiniti/Datsun, а также организациям, с которыми Общество осуществляет
                                    взаимодействие на основании соответствующих договоров и соглашений (информацию о
                                    третьих лицах (наименование и адрес лица) Вы можете уточнить путем запроса у
                                    Общества), в составе, необходимом для достижения следующих целей: хранения в
                                    информационных системах для оптимизации процессов взаимодействия; доставки
                                    заказанного товара, послепродажного обслуживания товара, уведомления о сервисных и
                                    отзывных кампаниях; осуществления контроля продаж и обслуживания покупателей;
                                    технической поддержки информационных систем; статистических и аналитических целей;
                                    проведения маркетинговых исследований. Настоящее согласие действует в течение 25
                                    лет со дня его подписания. Я уведомлен о том, что в соответствии со статьей 9
                                    Федерального закона от 27.07.2006 г. № 152-ФЗ «О персональных данных» настоящее
                                    согласие может быть отозвано мной путем направления в письменной форме уведомления
                                    Обществу заказным почтовым отправлением с описью вложения по адресу: 194362, г.
                                    Санкт-Петербург, пос. Парголово, Комендантский проспект, д.140, либо вручения лично
                                    под подпись уполномоченным представителям Общества. Настоящим я также подтвержадю,
                                    что согласен получать информацию о товарах, услугах и мероприятиях с помощью средств
                                    связи (интернет, смс, телефонных звонков, почты). Обработка персональных данных
                                    осуществляется в соответствии с Политикой в области обработки и защиты персональных
                                    данных
                                </div>
                            </InnerForm>
                        );
                    }}
                </Formik>
            </InnerForm>
        </SubscribeToNewsFormWrapper>
    );
};
