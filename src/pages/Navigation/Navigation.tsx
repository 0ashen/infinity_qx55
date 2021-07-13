import { NavigationWrapper } from './Navigation.styled';
import { Logo } from '../../components/Logo/Logo';
import React, { useEffect, useRef, VFC } from 'react';
import { NavigationProps } from './Navigation.type';
import { Power1, TimelineMax } from 'gsap';
import { routes } from '../../App';
import { changePage } from '../../hooks/changePage';

export const Navigation: VFC<NavigationProps> = ({ history }) => {
    const timeline = new TimelineMax({ paused: true });
    const logo = useRef(null);

    const containerWrapper = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        containerWrapper.current!.style.opacity = '1';

        timeline.from(logo.current, 0.5, {
            autoAlpha: 0,
            ease: Power1.easeIn,
        });

        timeline.play();
    });

    return (
        <NavigationWrapper ref={containerWrapper} style={{ opacity: 0 }}>
            <Logo ref={logo} />
            <div onClick={(e) => changePage(e, routes[0], timeline, history)}>
                GO WELCOME
            </div>
        </NavigationWrapper>
    );
};

