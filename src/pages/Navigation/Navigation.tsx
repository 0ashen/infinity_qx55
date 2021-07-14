import { City, NavigationWrapper } from './Navigation.styled';
import React, { useEffect, useRef, VFC } from 'react';
import { NavigationProps } from './Navigation.type';
import { gsap, Power1 } from 'gsap';
import { use3DPhoto } from '../../hooks/use3DPhoto';
import city from '../../media/images/city.jpg';
import cityDepthMap from '../../media/images/city-depth-map.jpg';

export const Navigation: VFC<NavigationProps> = ({ history }) => {
    const cityBackground = useRef<null | HTMLDivElement>(null);
    use3DPhoto(
        [
            { title: 'city', url: city },
            { title: 'cityDepthMap', url: cityDepthMap },
        ],
        cityBackground,
    );
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const timeline = gsap.timeline({ paused: true });
    useEffect(() => {
        containerWrapper.current!.style.opacity = '1';

        timeline.from(cityBackground.current, 0.7, {
            delay: 1,
            autoAlpha: 0,
            ease: Power1.easeIn,
        });

        timeline.play();
    });
    return (
        <NavigationWrapper ref={containerWrapper} style={{ opacity: 0 }}>
            <City ref={cityBackground} />
        </NavigationWrapper>
    );
};
