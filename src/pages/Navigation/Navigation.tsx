import {
    BalloonsWrapper,
    Canvas,
    City,
    Footer,
    Inner,
    NavigationWrapper,
} from './Navigation.styled';
import React, { useEffect, useRef, VFC } from 'react';
import { NavigationProps } from './Navigation.type';
import { gsap, Power1 } from 'gsap';
import { use3DPhoto } from '../../hooks/use3DPhoto';
import city from '../../media/images/city.jpg';
import cityDepthMap from '../../media/images/city-depth-map.jpg';
import { Logo } from '../../components/Logo/Logo';
import { Balloon } from './children/Balloon/Balloon';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { splitText } from '../../utils/splitText';
import { changePage } from '../../utils/changePage';
import dataUps from '../../data/dataUPS.json';
import { ROUTES_PATHS } from '../../App';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import Flickity from 'react-flickity-component';
import './Navigation.css';
import 'flickity/dist/flickity.min.css';
import { Button } from '../../ui/Button/Button';
import { ButtonPropsMode } from '../../ui/Button/Button.type';
import { Arrows } from './children/Arrows/Arrows';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import ReactGA from 'react-ga';

gsap.registerPlugin(ScrollTrigger);

export const Navigation: VFC<NavigationProps> = ({ history }) => {
    const canvasBackground = useRef<null | HTMLDivElement>(null);
    const cityScroll = useRef<null | HTMLDivElement>(null);
    const logo = useRef<null | HTMLDivElement>(null);
    use3DPhoto(
        [
            { title: 'city', url: city },
            { title: 'cityDepthMap', url: cityDepthMap },
        ],
        canvasBackground,
        [window.innerHeight * 2.75, window.innerHeight],
    );

    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    useEffect(() => {
        // show city background
        timeline
            .to(
                containerWrapper.current,
                {
                    duration: 0.7,
                    opacity: 1,
                    ease: Power1.easeIn,
                },
                0,
            )
            .to(
                logo.current,
                {
                    duration: 0.7,
                    opacity: 1,
                },
                0,
            );

        timeline.play();
    });
    useEffect(() => {
        (() => {
            if (isMobile) return;
            gsap.to(canvasBackground.current, {
                // xPercent: -100 / 3.331,
                x: -(window.innerHeight * 2.75 - window.innerWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: cityScroll.current!,
                    pin: true,
                    scrub: 1,
                    // snap: 1,
                    // base vertical scrolling on how wide the container is so it feels more natural.
                    // end: () => (window.innerHeight * 2.75).toString(),
                },
            });
        })();
        document.querySelectorAll('.left-arrow, .right-arrow').forEach((el) => {
            el.addEventListener('mouseenter', scroll);
        });
        document.querySelectorAll('.left-arrow, .right-arrow').forEach((el) => {
            el.addEventListener('mouseleave', stopScroll);
        });
        let scrollStatus = false;

        function stopScroll() {
            scrollStatus = false;
        }

        function goScroll(func: () => void) {
            if (scrollStatus) {
                setTimeout(() => {
                    func();
                    goScroll(func);
                }, 50);
            }
        }

        function scroll() {
            scrollStatus = true;
            // @ts-ignore
            if (this.classList.contains('left-arrow')) {
                goScroll(() => {
                    window.scroll(0, document.documentElement.scrollTop - 50);
                });
            }
            // @ts-ignore
            if (this.classList.contains('right-arrow')) {
                goScroll(() => {
                    window.scroll(0, document.documentElement.scrollTop + 50);
                });
            }
        }

        return () => {
            document
                .querySelectorAll('.left-arrow, .right-arrow')
                .forEach((el) => {
                    el.removeEventListener('mouseenter', stopScroll);
                });
        };
    });
    const Balloons = dataUps.map((el, idx) => (
        <Balloon
            title={splitText(el.title)}
            delay={idx * 0.3 + 1}
            imgUrl={el.preview}
            className={`balloon-${idx}`}
            key={idx}
            onClick={(e) => {
                changePage(
                    e,
                    el.type === 'page-with-iframe'
                        ? ROUTES_PATHS.MULTIMEDIA
                        : ROUTES_PATHS.UPS + idx,
                    timeline,
                    history,
                );
            }}
        />
    ));
    return (
        <NavigationWrapper ref={containerWrapper}>
            <Logo border={false} ref={logo} showSlogan />
            <City ref={cityScroll}>
                <BrowserView>
                    <Canvas
                        ref={canvasBackground}
                        style={{
                            width:
                                window.innerHeight * 2.75 -
                                (scrollbarWidth() || 0),
                            // height:
                            //     window.innerHeight - (scrollbarWidth() || 0),
                            height: window.innerHeight,
                        }}
                    >
                        <Inner>
                            <BalloonsWrapper>{Balloons}</BalloonsWrapper>
                        </Inner>
                    </Canvas>
                </BrowserView>
                <MobileView>
                    <Inner>
                        <BalloonsWrapper>
                            <Flickity
                                className={'carousel'}
                                elementType={'div'}
                                options={{
                                    initialIndex: 1,
                                    // prevNextButtons: false,
                                    pageDots: false,
                                    // draggable: false,
                                }}
                                disableImagesLoaded={false}
                                reloadOnUpdate
                                static
                            >
                                {Balloons.map((el, idx) => (
                                    <div className="slide" key={idx}>
                                        {el}
                                    </div>
                                ))}
                            </Flickity>
                        </BalloonsWrapper>
                    </Inner>
                </MobileView>
            </City>
            <Arrows />
            <Footer>
                <Button
                    id="book_button"
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
                <Button
                    id="presentation_button"
                    onClick={(e) => {
                        ReactGA.event({
                            category: 'click',
                            action: 'presentation_form',
                        });
                        changePage(
                            e,
                            ROUTES_PATHS.PRESENTATION,
                            timeline,
                            history,
                        );
                    }}
                >
                    Закрытый показ
                    <img src="//u282.actvin.com/0zlt06lg7n0qmpprqrdj0r267k94cj18tzbbi69y0uiwsade850wsu5z36ul0qm63mlzq617bg6wc1g70uw8itxgkl15c5p6xmj730a4p" />
                </Button>
                <Button
                    id="news_button"
                    onClick={(e) => {
                        ReactGA.event({
                            category: 'click',
                            action: 'news_button',
                        });
                        changePage(
                            e,
                            ROUTES_PATHS.SUBSCRIBE_TO_NEWS_FORM,
                            timeline,
                            history,
                        );
                    }}
                >
                    Подписка на новости
                    <img src="//u282.actvin.com/0trcdi2r0z0ux1wsx9uf1bbruznjnn15pqg0tsue19c2wy36110z50tg3gx90yes9vaxi619nmudcbiv0sy2z9r86d0qx0og1wer3jy2x" />
                </Button>
                <Button
                    onClick={(e) => {
                        window.open('https://infiniti-online.ru', '_blank');
                    }}
                    mode={ButtonPropsMode.withoutBorderWithIcon}
                >
                    Виртуальный шоурум
                </Button>
            </Footer>
        </NavigationWrapper>
    );
};
