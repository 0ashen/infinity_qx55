import {
    Caption,
    Car,
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
import { gsap, Power1 } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { routes } from '../../App';
import { changePage } from '../../utils/changePage';
import { use3DPhoto } from '../../hooks/use3DPhoto';
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
    );

    const timeline = gsap.timeline({ paused: true });
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const logo = useRef(null);
    const title = useRef(null);
    const caption = useRef(null);
    const button = useRef(null);

    useEffect(() => {
        containerWrapper.current!.style.opacity = '1';

        timeline
            .from(carBackground.current, 0.7, {
                delay: 1,
                autoAlpha: 0,
            })
            .from(logo.current, 0.2, {
                autoAlpha: 0,
                ease: Power1.easeIn,
            })
            .from(title.current, 0.2, {
                autoAlpha: 0,
                y: 35,
                ease: Power1.easeInOut,
            })
            .from(caption.current, 0.2, {
                autoAlpha: 0,
                y: 35,
                ease: Power1.easeInOut,
            })
            .from(button.current, 0.2, {
                autoAlpha: 0,
                y: 35,
                ease: Power1.easeInOut,
            });

        timeline.play();
    });

    return (
        <WelcomeWrapper ref={containerWrapper} style={{ opacity: 0 }}>
            <Car ref={carBackground} />
            <Inner>
                <Logo ref={logo} />
                <Left>
                    <Title ref={title}>
                        Дерзкий, атлетичный, но элегантный
                    </Title>
                    <Caption ref={caption}>
                        Дерзкий, атлетичный, но элегантный, подчеркивающий
                        фирменный стиль легендарного INFINITI FX
                    </Caption>
                </Left>
                <Right>
                    <Button
                        ref={button}
                        onClick={(e) =>
                            changePage(e, routes[1], timeline, history)
                        }
                    >
                        Записаться на тест-драйв
                    </Button>
                </Right>
            </Inner>
        </WelcomeWrapper>
    );
};
