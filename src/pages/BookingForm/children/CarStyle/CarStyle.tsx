import { CarStyleWrapper, Exterior, Interior } from './CarStyle.styled';
import React, { useState } from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/dist/flickity.min.css';
import { Slide } from './children/Slide/Slide';
import { UpsImage } from '../../../../ui/UpsImage/UpsImage';

const optionsExterior = [
    {
        value: 'black-obsidian',
        label: 'Black obsidian',
        hex: '#2e3134',
        colorSubTitle: 'Черный (GAT) Металлик',
    },
    {
        value: 'dynamic-sunstone-red',
        label: 'Dynamic Sunstone Red',
        hex: '#ff0100',
        colorSubTitle: 'Динамичный красный (NBA) Специальный Металлик',
    },
    {
        value: 'graphite-shadow',
        label: 'Graphite Shadow',
        hex: '#708090',
        colorSubTitle: 'Графит (KAD) Металлик',
    },
    {
        value: 'hermosa-blue',
        label: 'Hermosa Blue',
        hex: '#000080',
        colorSubTitle: 'Синий (BW5) Металлик',
    },
    {
        value: 'liquid-platinum',
        label: 'Liquid Platinum',
        hex: '#e9e8e9',
        colorSubTitle: 'Серебристый (K23) Металлик',
    },
    {
        value: 'majestic-white',
        label: 'Majestic White',
        hex: '#ecebf0',
        colorSubTitle: 'Кремовый (QAB) Металлик',
    },
    {
        value: 'mineral-black',
        label: 'Mineral Black',
        hex: '#1f1e21',
        colorSubTitle: 'Черный (KH3)',
    },
    {
        value: 'slate-gray',
        label: 'Slate Gray',
        hex: '#708090',
        colorSubTitle: 'Дымчато-серый (KBZ) Металлик',
    },
];
const optionsInterior = [
    {
        value: 'white',
        label: 'Белый',
    },
    {
        value: 'black',
        label: 'Черный',
    },
];
export type sliderItem = {
    title: string;
    price: string;
    advantages: string[];
};
const slider: sliderItem[] = [
    {
        title: 'INFINITI QX55 LUXE',
        price: '4 170 000',
        advantages: [
            'Камера заднего вида',
            'Передние и задние датчики парковки',
            'Бесключевой запуск двигателя',
            'Мультимедийная система Infiniti InTouch c Android Auto и Apple CarPlay',
            'Легкосплавные диски 20" / Летние шины 255/45 R20 Runflat',
        ],
    },
    {
        title: 'INFINITI QX55 ESSENTIAL',
        price: '4 270 000',
        advantages: [
            'Отделка сидений кожей',
            'Трехзонный автоматический климат-контроль',
            'Дистанционный запуск двигателя',
            'Аудиосистема BOSE с 15 динамиками',
            'Рулевое колесо с обогревом',
        ],
    },
    {
        title: 'INFINITI QX55 ESSENTIAL PROASSIST',
        price: '4 370 000',
        advantages: [
            'Интерактивная навигационная система',
            'Система кругового обзора и обнаружения приближающихся объектов',
            'Система адаптивного освещения дороги',
            'Интеллектуальное переключение дальнего/ближнего света фар',
            'Интеллектуальный круиз-контроль с управлением на руле',
        ],
    },
    {
        title: 'INFINITI QX55 ESSENTIAL PROACTIVE',
        price: '4 470 000',
        advantages: [
            'Адаптивная электронная система рулевого управления',
            'Предотвращение выхода из полосы движения',
            'Предотвращение наезда на препятствие при движении задним ходом',
            'Проекционный дисплей на лобовом стекле',
            'Интеллектуальная система помощи при экстренном торможении с функцией распознавания пешеходов',
        ],
    },
];

export const CarStyle = () => {
    const [exterior, setExterior] = useState<{
        selectedOption: { [key: string]: any } | null;
    }>({
        selectedOption: optionsExterior[0],
    });

    const [selectedModel, setSelectedModel] = useState<number>(0);

    const [selectedExterior, setSelectedExterior] = useState<number>(0);
    const [selectedInterior, setSelectedInterior] = useState<number>(0);

    return (
        <CarStyleWrapper>
            <Flickity
                className={'slider'}
                elementType={'div'}
                options={{
                    initialIndex: 0,
                    contain: true,
                    // prevNextButtons: false,
                    pageDots: false,
                    adaptiveHeight: true,
                    // draggable: false,
                }}
                disableImagesLoaded={false}
                reloadOnUpdate
                static
            >
                {slider.map((el, idx) => (
                    <Slide
                        key={idx}
                        {...el}
                        selected={selectedModel === idx}
                        setSelectedFunc={setSelectedModel}
                        idx={idx}
                        image={
                            exterior.selectedOption?.value || 'black-obsidian'
                        }
                    />
                ))}
            </Flickity>
            <Exterior>
                <div className="title">ЦВЕТ ЭКСТЕРЬЕРА*</div>
                <div className="body">
                    {optionsExterior.map((el, idx) => {
                        return (
                            <div
                                className={
                                    'item ' +
                                    (selectedExterior === idx
                                        ? ' is-active'
                                        : '')
                                }
                                key={idx}
                                onClick={() => setSelectedExterior(idx)}
                            >
                                <UpsImage
                                    imgSrc={`/images/colors-preview/${el.value}.jpg`}
                                    background
                                    className="image"
                                />
                                <p>{el.colorSubTitle}</p>
                            </div>
                        );
                    })}
                </div>
            </Exterior>
            <Interior>
                <div className="title">ЦВЕТ ИНТЕРЬЕРА*</div>
                <div className="body">
                    {optionsInterior.map((el, idx) => {
                        return (
                            <div
                                className={
                                    'item ' +
                                    (selectedInterior === idx
                                        ? ' is-active'
                                        : '')
                                }
                                key={idx}
                                onClick={() => setSelectedInterior(idx)}
                            >
                                <UpsImage
                                    imgSrc={`/images/qx55-colors-interior/${el.value}.jpg`}
                                    background
                                    className="image"
                                />
                                <p>{el.label}</p>
                            </div>
                        );
                    })}
                </div>
            </Interior>
        </CarStyleWrapper>
    );
};
