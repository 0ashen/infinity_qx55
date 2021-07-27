import { CarStyleWrapper, Exterior, Interior } from './CarStyle.styled';
import React, { useState, VFC } from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/dist/flickity.min.css';
import { Slide } from './children/Slide/Slide';
import { UpsImage } from '../../../../ui/UpsImage/UpsImage';
import { isMobile } from 'react-device-detect';

import optionsExterior from '../../../../data/exterior.json';
import optionsInterior from '../../../../data/interior.json';
import models from '../../../../data/models.json';

export type sliderItem = {
    title: string;
    price: string;
    advantages: string[];
};
const slider: sliderItem[] = models;

export const CarStyle: VFC<{
    accumulateDataToObject: {
        exterior: number;
        interior: number;
        model: number;
    };
}> = ({ accumulateDataToObject }) => {
    const [selectedModel, setSelectedModel] = useState<number>(0);

    const [selectedExterior, setSelectedExterior] = useState<number>(0);
    const [selectedInterior, setSelectedInterior] = useState<number>(0);

    accumulateDataToObject.exterior = selectedExterior;
    accumulateDataToObject.interior = selectedExterior;
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
                    // adaptiveHeight: true,
                    // draggable: false,
                    freeScroll: !isMobile,
                    groupCells: isMobile ? 1 : 2,
                }}
                disableImagesLoaded={false}
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
