import {
    AcceptTerms,
    Caption,
    DateRange,
    Errors,
    InnerForm,
    SubscribeToNewsFormWrapper,
    Title,
    ButtonText
} from './ClosedShow.styled';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../ui/Button/Button';
import React, { useEffect, useRef, useState, VFC } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import {
    ClosedShowFormValues,
    ClosedShowFormValuesValidate,
    ClosedShowSubmit,
    FormSubmitErrorsType,
} from './ClosedShow.types';
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
import { InfinitiSelect } from '../../ui/InfinitiSelect/InfinitiSelect';
import dealers from '../../data/closedForm.json';


const phoneNumberMask = [
    '8',
    '(',
    /[1-6,9]/,
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
    /\d/,
    /\d/,
];
export const ClosedShow: VFC<RouteComponentProps<any>> = ({ history }) => {
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
    });
    const [submitErrors, setSubmitErrors] = useState<
        FormSubmitErrorsType[] | null
    >();

    const validateValues: ClosedShowFormValuesValidate = {
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
    const initialValues: ClosedShowFormValues = {
        email: '',
        phone: '',
        last_name: '',
        first_name: '',
        acceptTerms: false,
        city: dealers[0],
        dialer: null,
    };
    const onSubmit: ClosedShowSubmit = (
        values,
        { setSubmitting, resetForm },
    ) => {
        axios({
            method: 'post',
            url: 'https://form.infiniti.ru/iframe/form_submit.php',
            data: qs.stringify({
                action: 'send_form',
                dealer_code: values.dialer?.value,
                // @ts-ignore
                dealer_range: values.dialer?.range,
                ...values,
                request_type_id: 224,
                client_confirm_communication: 1,
                title_form: 'Закрытый показ QX55',
                model: 'QX55',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json, text/javascript, */*; q=0.01',
            },
        })
            .then(function (response) {
                ReactGA.event({
                    category: 'form',
                    action: 'closed-show_form',
                });
                setSubmitting(false);
                resetForm();
                store.addNotification({
                    title: 'Успешно!',
                    message: 'Ваша заявка на закрытый показ была отправлена!',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                    },
                });
            })
            .catch(function (error) {
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
                <video
                    autoPlay
                    src={'/videos/closed-show.mp4'}
                    preload="auto"
                    muted
                    playsInline
                    loop
                />
                <Title>
                    Закрытый показ
                    <br /> Infiniti qx55
                </Title>
                <Caption>
                    Запишитесь на закрытый показ Infiniti qx55 в вашем городе:
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
                            setFieldValue,
                            setFieldTouched,
                        } = props;

                        
                        const whetherThereAreDealersInTheCurrentCity =
                            dealers?.find(
                                (el) => el.value === values.city?.value,
                            )!.dealersList?.length > 0;

                        return (
                            <InnerForm
                                onSubmit={handleSubmit}
                                id="closed-show_form"
                            >
                                <div className="diller-and-date">
                                    <InfinitiSelect
                                        caption={'Выберите город'}
                                        error={errors.city}
                                        touched={touched.city}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        value={values.city}
                                        defaultValue={initialValues.city}
                                        options={dealers}
                                        resetName="dialer"
                                        name="city"
                                        placeholder="Город"
                                    />
                                    {whetherThereAreDealersInTheCurrentCity && (
                                        <InfinitiSelect
                                            caption={'Выберите Дилера'}
                                            error={errors.dialer}
                                            touched={touched.dialer}
                                            value={values.dialer}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            name="dialer"
                                            placeholder="Дилер"
                                            options={
                                                values.city
                                                    ? dealers?.find(
                                                          (el) =>
                                                              el.value ===
                                                              values.city
                                                                  ?.value,
                                                      )!.dealersList
                                                    : []
                                            }
                                        />
                                    )}
                                    {
                                        //@ts-ignore
                                        values.dialer && values.dialer.range && (
                                            <DateRange>
                                                <p className="caption">
                                                    Период показа
                                                </p>
                                                <p className="value">
                                                    {
                                                        //@ts-ignore
                                                        values.dialer.range
                                                    }
                                                </p>
                                            </DateRange>
                                        )
                                    }
                                </div>
                                {!whetherThereAreDealersInTheCurrentCity && (
                                    <>
                                    <ButtonText>
                                        <p>            
                                                {(() => {
                                                    switch (values.city.value) {
                                                        case "15": return "В выбранном городе закрытый показ в дилерских центрах завершен. Экспонирование автомобиля будет проходить в крупнейших торговых центрах: ТРЦ «Афимолл Сити» (с 20.09.2021 по 20.10.2021), ТЦ «Цветной» (с 22.10.2021 по 19.11.2021) и ТРЦ «Авипарк» (с 21.11.2021 по 19.1.2021). Вы также можете получить консультацию по автомобилю, заполнив форму ниже:";
                                                        default: return "В выбранном городе закрытый показ INFINITI QX55 завершён. Получить консультацию по автомобилю Вы можете, заполнив форму ниже:";
                                                    }
                                                })()}
                                        </p>  
                                    </ButtonText>
                                    <Button
                                        onClick={(e) => {
                                            ReactGA.event({
                                                category: 'click',
                                                action: 'book_button',
                                            });
                                            changePage(
                                                e,
                                                ROUTES_PATHS.BOOKING_FORM,
                                                timeline,
                                                history,
                                            );
                                        }}
                                    >
                                        Забронировать
                                    </Button>
                                    </>
                                )}
                                {whetherThereAreDealersInTheCurrentCity && (
                                    <>
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
                                                        className={
                                                            'text-input-phone'
                                                        }
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
                                                        {
                                                            FORM_ERRORS[
                                                                el.message
                                                            ]
                                                        }
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
                                                    СОГЛАСИЕ НА ПОЛУЧЕНИЕ
                                                    ИНФОРМАЦИИ ОТ INFINITI *
                                                </label>
                                            </div>

                                            <ErrorMessage
                                                name="acceptTerms"
                                                component="div"
                                                className="acceptTerms__error"
                                            />
                                        </AcceptTerms>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Отправить
                                        </Button>
                                        <div className="legal-inforamtion">
                                            * Настоящим я выражаю свое
                                            безусловное согласие ООО «Ниссан
                                            Мэнуфэкчуринг РУС» (далее -
                                            «Общество») на обработку
                                            вышеуказанных персональных данных с
                                            использованием и без использования
                                            средств автоматизации, включая их
                                            передачу, в том числе
                                            трансграничную, компаниям группы
                                            Nissan, авторизованным дилерам
                                            Nissan/Infiniti/Datsun, а также
                                            организациям, с которыми Общество
                                            осуществляет взаимодействие на
                                            основании соответствующих договоров
                                            и соглашений (информацию о третьих
                                            лицах (наименование и адрес лица) Вы
                                            можете уточнить путем запроса у
                                            Общества), в составе, необходимом
                                            для достижения следующих целей:
                                            хранения в информационных системах
                                            для оптимизации процессов
                                            взаимодействия; доставки заказанного
                                            товара, послепродажного обслуживания
                                            товара, уведомления о сервисных и
                                            отзывных кампаниях; осуществления
                                            контроля продаж и обслуживания
                                            покупателей; технической поддержки
                                            информационных систем;
                                            статистических и аналитических
                                            целей; проведения маркетинговых
                                            исследований. Настоящее согласие
                                            действует в течение 25 лет со дня
                                            его подписания. Я уведомлен о том,
                                            что в соответствии со статьей 9
                                            Федерального закона от 27.07.2006 г.
                                            № 152-ФЗ «О персональных данных»
                                            настоящее согласие может быть
                                            отозвано мной путем направления в
                                            письменной форме уведомления
                                            Обществу заказным почтовым
                                            отправлением с описью вложения по
                                            адресу: 194362, г. Санкт-Петербург,
                                            пос. Парголово, Комендантский
                                            проспект, д.140, либо вручения лично
                                            под подпись уполномоченным
                                            представителям Общества. Настоящим я
                                            также подтвержадю, что согласен
                                            получать информацию о товарах,
                                            услугах и мероприятиях с помощью
                                            средств связи (интернет, смс,
                                            телефонных звонков, почты).
                                            Обработка персональных данных
                                            осуществляется в соответствии с
                                            Политикой в области обработки и
                                            защиты персональных данных
                                        </div>
                                    </>
                                )}
                            </InnerForm>
                        );
                    }}
                </Formik>
            </InnerForm>
        </SubscribeToNewsFormWrapper>
    );
};
