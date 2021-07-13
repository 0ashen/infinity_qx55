import {
    Caption,
    Car,
    Inner,
    Left,
    Right,
    Title,
    WelcomeWrapper,
} from './Welcome.styled';
import * as PIXI from 'pixi.js';
import qx55 from '../../media/images/welcome-background.jpg';
import qx55DepthMap from '../../media/images/welcome-background--map8.jpg';
import { Button } from '../../ui/Button/Button';
import React, { useEffect, useRef, VFC } from 'react';
import { Logo } from '../../components/Logo/Logo';
import { WelcomeProps } from './Welcome.type';
import { gsap, Power1 } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { routes } from '../../App';
import { changePage } from '../../hooks/changePage';
// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

let carImageResources = false;

export const Welcome: VFC<WelcomeProps> = ({ history }) => {
    const carBackground = useRef<null | HTMLDivElement>(null);
    const timeline = gsap.timeline({ paused: true });

    const containerWrapper = useRef<null | HTMLDivElement>(null);
    const logo = useRef(null);
    const title = useRef(null);
    const caption = useRef(null);
    const button = useRef(null);

    useEffect(() => {
        if (!carImageResources) {
            PIXI.Loader.shared
                .add('car', qx55)
                .add('carDepthMap', qx55DepthMap)
                .load((loader, resources) => {
                    init(resources);
                    carImageResources = resources;
                });
        } else {
            init(carImageResources);
        }

        function init(resources: any) {
            const app = new PIXI.Application({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            carBackground.current?.appendChild(app.view);

            const imageSprite = PIXI.Sprite.from(resources.car.texture);
            setImageCover(imageSprite, app);
            app.stage.addChild(imageSprite);

            const depthMapSprite = PIXI.Sprite.from(
                resources.carDepthMap.texture,
            );
            setImageCover(depthMapSprite, app);
            app.stage.addChild(depthMapSprite);

            let displacementFilter = new PIXI.filters.DisplacementFilter(
                depthMapSprite,
            );
            app.stage.filters = [displacementFilter];

            function mouseMoveHandler(e: any) {
                displacementFilter.scale.x =
                    (window.innerWidth / 2 - e.clientX) / 80;
                displacementFilter.scale.y =
                    (window.innerHeight / 2 - e.clientY) / 80;
            }

            window.addEventListener('mousemove', mouseMoveHandler);
        }

        // return () => {
        //     window.removeEventListener('mousemove', mouseMoveHandler);
        // };
    }, [carBackground]);
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

function setImageCover(imageSprite: PIXI.Sprite, app: PIXI.Application) {
    const containerWidth = app.screen.width;
    const containerHeight = app.screen.height;

    const imageRatio = imageSprite.width / imageSprite.height;
    const containerRatio = containerWidth / containerHeight;

    if (containerRatio > imageRatio) {
        imageSprite.height =
            imageSprite.height / (imageSprite.width / containerWidth);
        imageSprite.width = containerWidth;
        imageSprite.position.x = 0;
        imageSprite.position.y = (containerHeight - imageSprite.height) / 2;
    } else {
        imageSprite.width =
            imageSprite.width / (imageSprite.height / containerHeight);
        imageSprite.height = containerHeight;
        imageSprite.position.y = 0;
        imageSprite.position.x = (containerWidth - imageSprite.width) / 2;
    }
}
