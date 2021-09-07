import {
    AdditionalInfo,
    BodyRight,
    Description,
    Header,
    Inner,
    Media,
    Navigation,
    NavigationItem,
    Section,
    Slide,
    Title,
    UpsAdvantage,
    UpsWrapper,
} from './Ups.styled';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState, VFC } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import dataUps from '../../data/dataUPS.json';
import Flickity from 'react-flickity-component';

import 'flickity/dist/flickity.min.css';
import { Logo } from '../../components/Logo/Logo';
import { FooterNavigation } from '../../components/FooterNavigation/FooterNavigation';
import { LazyImage } from '../../ui/LazyImage/LazyImage';
import { changePage } from '../../utils/changePage';
import { ROUTES_PATHS } from '../../App';
import ReactGA from 'react-ga';
import { LazyVideo } from '../../ui/LazyVideo/LazyVideo';

export const Ups: VFC<RouteComponentProps<any>> = ({ history }) => {
    const { id = '0' } = useParams<{ id?: string }>();
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const sliderRef = useRef<null | Flickity>(null);

    const [selectedSlide, setSelectedSlide] = useState({ value: 0 });
    const slide = dataUps[+id as number].data[selectedSlide.value];
    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
        const currentSlider = sliderRef.current;
        if (!currentSlider) return;
        currentSlider.on('change', changeHandle);
        currentSlider.on('ready', readyHandle);
        if (slide.imgSet.length === 1) {
            console.log('play');
            playVideoWithoutSlider();
        }
        return () => {
            currentSlider.off('change', changeHandle);
            currentSlider.off('ready', readyHandle);
        };
    });

    const slideComponent = slide.imgSet.map((el, idx) => {
        return (
            <Slide className="slide" key={idx}>
                {typeof el === 'string' ? (
                    <LazyImage src={el} />
                ) : (
                    <LazyVideo src={el.src} />
                )}
            </Slide>
        );
    });

    function resetSlideState() {
        selectedSlide.value = 0;
    }

    return (
        <UpsWrapper ref={containerWrapper}>
            <Inner>
                <Logo
                    getBack={{
                        title: 'В город',
                        onClick: (
                            e: React.MouseEvent<HTMLElement, MouseEvent>,
                        ) => {
                            changePage(
                                e,
                                ROUTES_PATHS.NAVIGATION,
                                timeline,
                                history,
                            );
                        },
                    }}
                />
                <Header>
                    <Section>{dataUps[+id].title}</Section>
                    <Navigation>
                        {dataUps[+id as number].data.map((el, idx) => (
                            <NavigationItem
                                key={idx}
                                id={`usp_${id}-${idx}_button`}
                                onClick={() => {
                                    if (sliderRef.current)
                                        sliderRef.current.select(0);
                                    setSelectedSlide({ value: idx });
                                    ReactGA.event({
                                        category: 'click',
                                        action: `usp_${id}-${idx}_button`,
                                    });
                                }}
                            >
                                {el.title}
                            </NavigationItem>
                        ))}
                    </Navigation>
                </Header>
                <UpsAdvantage>
                    <Media>
                        {slide.imgSet &&
                            (slide.imgSet.length > 1 ? (
                                <Flickity
                                    className={'carousel'} // default ''
                                    elementType={'div'} // default 'div'
                                    options={{
                                        initialIndex: 0,
                                        pageDots: false,
                                        prevNextButtons:
                                            slide.imgSet.length > 1,
                                    }} // takes flickity options {}
                                    reloadOnUpdate // default false
                                    flickityRef={(ref) =>
                                        (sliderRef.current = ref)
                                    }
                                >
                                    {slideComponent}
                                </Flickity>
                            ) : (
                                slideComponent
                            ))}
                    </Media>
                    <BodyRight>
                        <Title>{slide.title}</Title>
                        <Description>{slide.text}</Description>
                        <AdditionalInfo>
                            <a
                                href="https://www-europe.infiniti-cdn.net/content/dam/Infiniti/Russia/2021/QX55/Prices/qx55.pdf"
                                className="item"
                                target="_blank"
                                rel="noreferrer"
                                id="price_button"
                                onClick={() => {
                                    ReactGA.event({
                                        category: 'click',
                                        action: 'price_button',
                                    });
                                }}
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
                                <img src="//u282.actvin.com/1528iya3pv13hqavaas70w4kmf3q6b1980f8c7ye0xn5nl1rnp0ycylmfdkd19pofbiae60ugflssi1j16l5s6yuxx12lxxt3as33lcnd" />
                            </a>
                            <a
                                href="https://form.infiniti.ru/qx55_broshure/"
                                className="item"
                                target="_blank"
                                rel="noreferrer"
                                id="broshure_button"
                                onClick={() => {
                                    ReactGA.event({
                                        category: 'click',
                                        action: 'broshure_button',
                                    });
                                }}
                            >
                                <svg
                                    width="10"
                                    height="13"
                                    viewBox="0 0 8 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.4,11.8V5.5H3.8v6.3l-1.4-1.3L2,10.9L4.1,13l0.2-0.2l0,0l1.9-1.9l-0.4-0.5L4.4,11.8z M4.9,1.2H0.4v8.2h2.4	V8.8H1V1.9h3.4v2.4H7v4.5H5.5v0.6h2.1V3.8L4.9,1.2z M5.1,2.3l1.4,1.3H5.1V2.3z"
                                        fill="white"
                                    />
                                </svg>
                                <div>Брошюра</div>
                                <img src="//u282.actvin.com/18yjm2mkib12bmz4s5qv18zl7in9kz0yp6hlsyme0renwzp0sl0zx319rka516zgnxnyu617bg6wc1g715f2gggpwl1aek41s8cz4kguh" />
                            </a>
                        </AdditionalInfo>
                    </BodyRight>
                </UpsAdvantage>
                <FooterNavigation
                    history={history}
                    id={+id}
                    timeline={timeline}
                    reset={resetSlideState}
                />
            </Inner>
        </UpsWrapper>
    );
};

function playVideo() {
    const video: NodeListOf<HTMLVideoElement> = document.querySelectorAll(
        '.slide.is-selected video',
    );
    if (video && video.length > 0) {
        video[0].play();
    }
}

function playVideoWithoutSlider() {
    const video: NodeListOf<HTMLVideoElement> =
        document.querySelectorAll('.slide video');
    if (video && video.length > 0) {
        video[0].play();
    }
}

function clearVideos() {
    document.querySelectorAll('.slide video').forEach((el: any) => {
        if (!el.paused) {
            // el.pause();
        }
    });
}

function changeHandle() {
    // clearVideos();
    // playVideo();
}

function readyHandle() {
    // playVideo();
}
