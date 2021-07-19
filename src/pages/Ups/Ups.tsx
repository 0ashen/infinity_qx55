import {
    AdditionalInfo,
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
import { Logo } from '../../components/Logo/Logo';
import { BrowserView, MobileView } from 'react-device-detect';

export const Ups: VFC<RouteComponentProps<any>> = ({ history }) => {
    const { id = '0' } = useParams<{ id?: string }>();
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const sliderRef = useRef<null | Flickity>(null);

    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
        sliderRef.current?.on('change', () => {
            const video: HTMLVideoElement | null = document.querySelector(
                '.slide.is-selected video',
            );
            if (video) {
                video.play();
            }
        });
    });

    const [selectedSlide, setSelectedSlide] = useState(0);
    const slide = dataUps[+id as number].data[selectedSlide];
    return (
        <UpsWrapper ref={containerWrapper}>
            <Inner>
                <Logo />
                {dataUps[+id as number].iframe ? (
                    <iframe
                        src={dataUps[+id as number].iframe}
                        title={'asdfasdf'}
                    />
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
                                                    <video
                                                        src={el.src}
                                                        controls
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
                                <AdditionalInfo>
                                    <a
                                        href="#"
                                        className="item"
                                        target="_blank"
                                    >
                                        <svg
                                            width="11"
                                            height="12"
                                            viewBox="0 0 11 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.08594 0H2.90625V3.31641H3.55078V0.597656H7.61719V3.31641H10.3477V11.0859H3.55078V9.64453H2.90625V11.7305H10.9922V2.88281L8.08594 0ZM8.26172 1.05469L9.87891 2.67188H8.26172V1.05469ZM3.91406 9.02344C4.25 9.02344 4.5625 8.96094 4.85156 8.83594C5.14844 8.71094 5.40625 8.53906 5.625 8.32031C5.84375 8.10156 6.01562 7.84375 6.14062 7.54688C6.27344 7.25 6.33984 6.9375 6.33984 6.60938C6.33984 6.27344 6.27344 5.96094 6.14062 5.67188C6.01562 5.375 5.84375 5.11719 5.625 4.89844C5.40625 4.67969 5.14844 4.50781 4.85156 4.38281C4.5625 4.25 4.25 4.18359 3.91406 4.18359C3.58594 4.18359 3.27344 4.25 2.97656 4.38281C2.67969 4.50781 2.42188 4.67969 2.20312 4.89844C1.98438 5.11719 1.8125 5.375 1.6875 5.67188C1.5625 5.96094 1.5 6.27344 1.5 6.60938C1.5 6.88281 1.54297 7.14453 1.62891 7.39453C1.71484 7.64453 1.83594 7.87109 1.99219 8.07422L0 10.0547L0.445312 10.5L2.4375 8.51953C2.64062 8.67578 2.86719 8.80078 3.11719 8.89453C3.375 8.98047 3.64062 9.02344 3.91406 9.02344ZM3.91406 4.81641C4.41406 4.81641 4.83594 4.99219 5.17969 5.34375C5.53125 5.69531 5.70703 6.11719 5.70703 6.60938C5.70703 7.10156 5.53125 7.52344 5.17969 7.875C4.83594 8.21875 4.41406 8.39062 3.91406 8.39062C3.42188 8.39062 3 8.21875 2.64844 7.875C2.30469 7.52344 2.13281 7.10156 2.13281 6.60938C2.13281 6.11719 2.30469 5.69531 2.64844 5.34375C3 4.99219 3.42188 4.81641 3.91406 4.81641Z"
                                                fill="white"
                                            />
                                        </svg>
                                        <div>Прайс-Лист</div>
                                    </a>
                                    <a
                                        href="#"
                                        className="item"
                                        target="_blank"
                                    >
                                        <svg
                                            width="8"
                                            height="13"
                                            viewBox="0 0 8 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.44531 11.2734V4.96875H3.82422V11.2969L2.46484 9.94922L2.01953 10.3945L4.11719 12.5039L4.35156 12.2695L4.36328 12.2812L6.25 10.3945L5.80469 9.9375L4.44531 11.2734ZM4.89062 0.703125H0.414062V8.91797H2.80469V8.28516H1.04688V1.35938H4.44531V3.77344H6.95312V8.29688H5.48828V8.91797H7.58594V3.31641L4.89062 0.703125ZM5.07812 1.78125L6.47266 3.11719H5.07812V1.78125Z"
                                                fill="white"
                                            />
                                        </svg>
                                        <div>Брошура</div>
                                    </a>
                                </AdditionalInfo>
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
                        className={(+id as number) - 1 >= 0 ? '' : 'hide'}
                    >
                        <span />
                        <div>
                            <BrowserView>Предыдущий usp</BrowserView>
                            <MobileView>Пред. usp</MobileView>
                        </div>
                    </LeftButton>
                    <Button
                        onClick={(e) => {
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
                    <Button
                        onClick={(e) => {
                            changePage(
                                e,
                                ROUTES_PATHS.CLOSED_SHOW_FORM,
                                timeline,
                                history,
                            );
                        }}
                    >
                        Закрытый показ
                    </Button>
                    <Button
                        onClick={(e) => {
                            changePage(
                                e,
                                ROUTES_PATHS.SUBSCRIBE_TO_NEWS_FORM,
                                timeline,
                                history,
                            );
                        }}
                    >
                        Подписка на новости
                    </Button>

                    <RightButton
                        onClick={(e) => {
                            changePage(
                                e,
                                ROUTES_PATHS.UPS + (+id + 1),
                                timeline,
                                history,
                            );
                        }}
                        className={+id + 1 <= 4 ? '' : 'hide'}
                    >
                        <span />

                        <div>
                            <BrowserView>Следующий usp</BrowserView>
                            <MobileView>След. usp</MobileView>
                        </div>
                    </RightButton>
                </FooterNavigation>
            </Inner>
        </UpsWrapper>
    );
};
