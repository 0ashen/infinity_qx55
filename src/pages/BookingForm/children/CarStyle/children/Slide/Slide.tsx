import { UpsImage } from '../../../../../../ui/UpsImage/UpsImage';
import React, { useState, VFC } from 'react';
import { SlideWrapper } from './Slide.styled';
import { sliderItem } from '../../CarStyle';

export const Slide: VFC<
    sliderItem & {
        image: string;
        selected: boolean;
        setSelectedFunc: React.Dispatch<React.SetStateAction<number>>;
        idx: number;
    }
> = ({ title, price, image, advantages, selected, setSelectedFunc, idx }) => {
    const [advantagesIsHidden, setAdvantagesIsHidden] = useState(true);

    return (
        <SlideWrapper>
            <div className={'inner' + (selected ? ' selected' : '')}>
                <div className="title">{title}</div>
                <UpsImage
                    imgSrc={`/images/qx55-colors/${image}.png`}
                    background
                    className={'image'}
                />
                <div className="price">
                    Цена от  <span>{price} ₽&sup1;</span>
                </div>
                <div className="advantages">
                    <button
                        className="advantages-button"
                        onClick={() => {
                            setAdvantagesIsHidden(!advantagesIsHidden);
                        }}
                    >
                        {advantagesIsHidden
                            ? '+ Показать особенности'
                            : '- Скрыть'}
                    </button>
                    {!advantagesIsHidden && (
                        <ul>
                            {advantages.map((el, idx) => (
                                <li key={idx}>- {el}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    className={'select' + (selected ? ' is-selected' : '')}
                    onClick={() => {
                        setSelectedFunc(idx);
                    }}
                >
                    {!selected ? 'Выбрать*' : 'Выбрано'}
                </button>
            </div>
        </SlideWrapper>
    );
};
