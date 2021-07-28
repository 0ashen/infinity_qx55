import { Inner, UpsWrapper } from './Multimedia.styled';
import { gsap } from 'gsap';
import React, { useEffect, useRef, VFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import dataUps from '../../data/dataUPS.json';

import 'flickity/dist/flickity.min.css';
import { Logo } from '../../components/Logo/Logo';
import { FooterNavigation } from '../../components/FooterNavigation/FooterNavigation';
import { changePage } from '../../utils/changePage';
import { ROUTES_PATHS } from '../../App';

export const Multimedia: VFC<RouteComponentProps<any>> = ({ history }) => {
    const id = dataUps.length - 1;
    const containerWrapper = useRef<null | HTMLDivElement>(null);

    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
    });

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
                <iframe
                    src={dataUps[+id as number].iframe}
                    title={'asdfasdf'}
                />
                <FooterNavigation
                    history={history}
                    id={+id}
                    timeline={timeline}
                />
            </Inner>
        </UpsWrapper>
    );
};
