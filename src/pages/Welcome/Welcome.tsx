import {
    Caption,
    Car,
    CarModelTitle, FooterGroup,
    Inner,
    Left,
    Right,
    Title,
    WelcomeWrapper,
} from './Welcome.styled';
import qx55 from '../../media/images/welcome-background.jpg';
import qx55DepthMap from '../../media/images/welcome-background--map8.jpg';
import { Button } from '../../ui/Button/Button';
import React, { useEffect, useRef, VFC } from 'react';
import { Logo } from '../../components/Logo/Logo';
import { WelcomeProps } from './Welcome.type';
import { Expo, gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { routes } from '../../App';
import { changePage } from '../../utils/changePage';
import { use3DPhoto } from '../../hooks/use3DPhoto';
import { splitText } from '../../utils/splitText';
import { isMobile } from 'react-device-detect';
// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

export const Welcome: VFC<WelcomeProps> = ({ history }) => {
    const carBackground = useRef<null | HTMLDivElement>(null);
    use3DPhoto(
        [
            { title: 'car', url: qx55 },
            { title: 'carDepthMap', url: qx55DepthMap },
        ],
        carBackground,
        [window.innerWidth, window.innerHeight],
    );

    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const logo = useRef<null | HTMLDivElement>(null);
    const title = useRef<null | HTMLDivElement>(null);
    const caption = useRef<null | HTMLDivElement>(null);
    const button = useRef<null | HTMLButtonElement>(null);
    const carModelTitleRef = useRef<null | HTMLDivElement>(null);

    const timelineHide = gsap.timeline({ paused: true, delay: 0.1 });

    useEffect(() => {
        timelineHide.to(
            containerWrapper.current,
            {
                duration: 1,
                opacity: 1,
            },
            0,
        );
        timelineHide.play();

        timeline
            .to(
                containerWrapper.current,
                {
                    duration: 1,
                },
                0,
            )
            .from(
                carBackground.current,
                {
                    duration: 0.7,
                    autoAlpha: 0,
                },
                0,
            )
            .from(logo.current, {
                duration: 1.5,
                y: -100,
                ease: Expo.easeOut,
            })
            .to(
                carModelTitleRef.current!.querySelectorAll('span'),
                {
                    duration: 1.5,
                    opacity: 1,
                    y: 0,
                    ease: Expo.easeOut,
                    stagger: 0.1,
                },
                '-=0.7',
            )
            .to(
                title.current!.querySelectorAll('span'),
                {
                    duration: 1.2,
                    opacity: 1,
                    y: 0,
                    ease: Expo.easeOut,
                    stagger: 0.02,
                },
                '-=0.7',
            )
            .to(
                caption.current!.querySelectorAll('span'),
                {
                    duration: 1.2,
                    opacity: 1,
                    y: 0,
                    ease: Expo.easeOut,
                    stagger: 0.01,
                },
                '-=0.7',
            )
            .from(
                button.current,
                {
                    duration: 1,
                    opacity: 0,
                    x: 150,
                    ease: Expo.easeOut,
                },
                '-=0.7',
            );

        timeline.play();
    });

    return (
        <WelcomeWrapper ref={containerWrapper}>
            {!isMobile && <Car ref={carBackground} />}
            <Inner>
                <Logo ref={logo} border={false} />
                <CarModelTitle ref={carModelTitleRef}>
                    {splitText('INFINITI QX55')}
                </CarModelTitle>
                <FooterGroup>
                    <Left>
                        <Title ref={title}>
                            {splitText('В ЦЕНТРЕ ВНИМАНИЯ')}
                        </Title>
                        <Caption ref={caption}>
                            {splitText(
                                'Верьте и воплощайте свои идеи. Покажите их миру. Забудьте о том, что скромность украшает',
                            )}
                        </Caption>
                    </Left>
                    <Right>
                        <Button
                            ref={button}
                            id="start_button"
                            onClick={(e) =>
                                changePage(
                                    e,
                                    routes[1].path,
                                    timelineHide,
                                    history,
                                )
                            }
                        >
                            УЗНАТЬ БОЛЬШЕ
                        </Button>
                    </Right>
                </FooterGroup>
            </Inner>
        </WelcomeWrapper>
    );
};
