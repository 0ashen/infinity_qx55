import { CarStyleWrapper, Dialer, Exterior, Interior } from './CarStyle.styled';
import React, { useState } from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/dist/flickity.min.css';
import { Slide } from './children/Slide/Slide';
import { LazyImage } from '../../../../ui/LazyImage/LazyImage';
import { isMobile } from 'react-device-detect';
//data
import optionsExterior from '../../../../data/exterior.json';
import optionsInterior from '../../../../data/interior.json';
import models from '../../../../data/models.json';
import { CarStyleProps, sliderItem } from './CarStyle.type';
import { InfinitiSelect } from '../../../../ui/InfinitiSelect/InfinitiSelect';
import dealers from '../../../../data/bookingForm.json';
import { BookingFormValues } from '../../BookingForm.types';

const slider: sliderItem[] = models;

export const CarStyle = <T extends BookingFormValues>({
    accumulateDataToObject,
    ...props
}: CarStyleProps<T>): JSX.Element => {
    const [selectedModel, setSelectedModel] = useState<number>(0);

    const [selectedExterior, setSelectedExterior] = useState<number>(0);
    const [selectedInterior, setSelectedInterior] = useState<number>(0);

    accumulateDataToObject.exterior = selectedExterior;
    accumulateDataToObject.interior = selectedInterior;
    accumulateDataToObject.model = selectedModel;

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
                    freeScroll: !isMobile,
                    groupCells: isMobile ? 1 : 2,
                }}
                disableImagesLoaded={true}
                // reloadOnUpdate
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
                            optionsExterior[selectedExterior]?.value ||
                            'black-obsidian'
                        }
                    />
                ))}
            </Flickity>
            <Exterior>
                <div className="title">ЦВЕТ ЭКСТЕРЬЕРА</div>
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
                                <LazyImage
                                    src={`/images/colors-preview/${el.value}.jpg`}
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
                <div className="title">ЦВЕТ ИНТЕРЬЕРА</div>
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
                                <LazyImage
                                    src={`/images/qx55-colors-interior/${el.value}.jpg`}
                                    background
                                    className="image"
                                />
                                <p>{el.label}</p>
                            </div>
                        );
                    })}
                </div>
            </Interior>
            <Dialer>
                <div className="item">
                    <InfinitiSelect
                        caption={'Выберите город'}
                        error={props.errors.city}
                        touched={props.touched.city}
                        onChange={props.setFieldValue}
                        onBlur={props.setFieldTouched}
                        value={props.values.city}
                        defaultValue={props.initialValues.city}
                        options={dealers}
                        resetName="dialer"
                        name="city"
                        placeholder="Город"
                    />
                </div>
                <div className="item" style={{ flexGrow: 1 }}>
                    <InfinitiSelect
                        caption={'Выберите Дилера'}
                        error={props.errors.dialer}
                        touched={props.touched.dialer}
                        value={props.values.dialer}
                        onChange={props.setFieldValue}
                        onBlur={props.setFieldTouched}
                        name="dialer"
                        placeholder="Дилер"
                        options={
                            props.values.city
                                ? dealers?.find(
                                      (el) =>
                                          el.value === props.values.city?.value,
                                  )!.dealersList
                                : []
                        }
                    />
                </div>
            </Dialer>
        </CarStyleWrapper>
    );
};
