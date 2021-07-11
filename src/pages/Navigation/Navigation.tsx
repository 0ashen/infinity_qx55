import { NavigationWrapper } from './Navigation.styled';
import { Logo } from '../../components/Logo/Logo';
import React, { useEffect, useRef, VFC } from 'react';
import { NavigationProps } from './Navigation.type';
import { Power1, TimelineMax } from 'gsap';
import { ROUTES_PATH } from '../../App';

export const Navigation: VFC<NavigationProps> = ({ history }) => {
    const timeline = new TimelineMax({ paused: true });
    const logo = useRef(null);
    useEffect(() => {
        timeline.from(logo.current, 1, {
            autoAlpha: 0,
            delay: 0.25,
            ease: Power1.easeIn,
        });

        timeline.play();
    });
    const changePage = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        destination: ROUTES_PATH,
    ) => {
        e.preventDefault();
        timeline.reverse();
        const timelineDuration = timeline.duration() * 1000;
        setTimeout(() => {
            history.push(destination);
        }, timelineDuration);
    };

    return (
        <NavigationWrapper>
            <Logo ref={logo}/>
            <div onClick={(e) => changePage(e, ROUTES_PATH.HOME_WELCOME)}>
                GO WELCOME
            </div>
        </NavigationWrapper>
    );
};
