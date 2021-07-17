import {
    BodyRight,
    Description,
    FooterNavigation,
    Header,
    Inner,
    LeftButton,
    Media,
    Navigation,
    NavigationItem,
    RightButton,
    Section,
    Slide,
    Title,
    UpsWrapper,
} from './Ups.styled';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState, VFC } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import dataUps from '../../dataUPS.json';
import Flickity from 'react-flickity-component';

import 'flickity/dist/flickity.min.css';
import { Button } from '../../ui/Button/Button';
import { changePage } from '../../utils/changePage';
import { ROUTES_PATHS } from '../../App';

export const Ups: VFC<RouteComponentProps<any>> = ({ history }) => {
    const { id = '0' } = useParams<{ id?: string }>();
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
    });
    const sliderRef = useRef<null | Flickity>(null);

    const [selectedSlide, setSelectedSlide] = useState(0);
    const slide = dataUps[+id as number].data[selectedSlide];
    return (
        <UpsWrapper ref={containerWrapper}>
            <Inner>
                {dataUps[+id as number].iframe ? (
                    <iframe src={dataUps[+id as number].iframe} />
                ) : (
                    <>
                        <Header>
                            <Section>{dataUps[+id].title}</Section>
                            <Navigation>
                                {dataUps[+id as number].data.map((el, idx) => (
                                    <NavigationItem
                                        key={idx}
                                        onClick={() => {
                                            if (sliderRef.current)
                                                sliderRef.current.select(0);
                                            setSelectedSlide(idx);
                                        }}
                                    >
                                        {el.title}
                                    </NavigationItem>
                                ))}
                            </Navigation>
                        </Header>
                        <Slide>
                            <Media>
                                {slide.imgSet && (
                                    <Flickity
                                        className={'carousel'} // default ''
                                        elementType={'div'} // default 'div'
                                        options={{
                                            initialIndex: 0,
                                            pageDots: false,
                                        }} // takes flickity options {}
                                        reloadOnUpdate // default false
                                        flickityRef={(ref) =>
                                            (sliderRef.current = ref)
                                        }
                                    >
                                        {slide.imgSet.length === 0 && (
                                            <div className="slide" />
                                        )}
                                        {slide.imgSet.map((el, idx) => {
                                            if (typeof el === 'string') {
                                                return (
                                                    <div
                                                        className="slide"
                                                        key={idx}
                                                    >
                                                        <img src={el} alt="" />
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div
                                                    className="slide"
                                                    key={idx}
                                                >
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src={el.src}
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Flickity>
                                )}
                            </Media>
                            <BodyRight>
                                <Title>{slide.title}</Title>
                                <Description>{slide.text}</Description>
                                <Button
                                    onClick={(e) => {
                                        changePage(
                                            e,
                                            ROUTES_PATHS.FORM,
                                            timeline,
                                            history,
                                        );
                                    }}
                                >
                                    Записаться на тест-драйв
                                </Button>
                            </BodyRight>
                        </Slide>
                    </>
                )}

                <FooterNavigation>
                    <LeftButton
                        onClick={(e) => {
                            changePage(
                                e,
                                ROUTES_PATHS.UPS + ((+id as number) - 1),
                                timeline,
                                history,
                            );
                        }}
                        style={{
                            opacity: (+id as number) - 1 >= 0 ? 1 : 0,
                            pointerEvents:
                                (+id as number) - 1 >= 0 ? 'auto' : 'none',
                        }}
                    >
                        <span></span>
                        <p>Предыдущий usp</p>
                    </LeftButton>
                    <Button>Забронировать</Button>
                    <Button>Закрытый показ</Button>
                    <Button>Подписка на новости</Button>

                    <RightButton
                        onClick={(e) => {
                            changePage(
                                e,
                                ROUTES_PATHS.UPS + (+id + 1),
                                timeline,
                                history,
                            );
                        }}
                        style={{
                            opacity: +id + 1 <= 3 ? 1 : 0,
                            pointerEvents: +id + 1 <= 3 ? 'auto' : 'none',
                        }}
                    >
                        <span></span>
                        <p>Следующий usp</p>
                    </RightButton>
                </FooterNavigation>
            </Inner>
        </UpsWrapper>
    );
};
