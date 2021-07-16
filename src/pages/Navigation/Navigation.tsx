import { Canvas, City, Inner, NavigationWrapper } from './Navigation.styled';
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
import dataUps from '../../dataUPS.json';
import { ROUTES_PATHS } from '../../App';

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

    return (
        <NavigationWrapper ref={containerWrapper}>
            <Logo border={false} ref={logo} />
            <City ref={cityScroll}>
                <Canvas
                    ref={canvasBackground}
                    style={{
                        width: window.innerHeight * 2.75,
                        height: window.innerHeight,
                    }}
                >
                    <Inner>
                        {dataUps.map((el, idx) => (
                            <Balloon
                                title={splitText(el.title)}
                                delay={idx * 0.3 + 1}
                                key={idx}
                                onClick={(e) => {
                                    changePage(
                                        e,
                                        ROUTES_PATHS.UPS + idx,
                                        timeline,
                                        history,
                                    );
                                }}
                            />
                        ))}
                    </Inner>
                </Canvas>
            </City>
        </NavigationWrapper>
    );
};
