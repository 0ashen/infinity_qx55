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
import qx55__map from '../../media/images/welcome-background--map4.jpg';
import { Button } from '../../ui/Button/Button';
import { useEffect, useRef } from 'react';

export const Welcome = () => {
    const backgroundRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        backgroundRef.current?.appendChild(app.view);
        // @ts-ignore
        let img = new PIXI.Sprite.from(qx55);
        img.width = window.innerWidth;
        img.height = window.innerHeight;
        app.stage.addChild(img);

        // @ts-ignore
        let depthMap = new PIXI.Sprite.from(qx55__map);
        depthMap.width = window.innerWidth;
        depthMap.height = window.innerHeight;
        app.stage.addChild(depthMap);

        let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
        app.stage.filters = [displacementFilter];

        function mouseMoveHandler(e: any) {
            displacementFilter.scale.x =
                (window.innerWidth / 2 - e.clientX) / 100;
            displacementFilter.scale.y =
                (window.innerHeight / 2 - e.clientY) / 100;
        }
        window.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, [backgroundRef]);

    return (
        <WelcomeWrapper>
            <Car ref={backgroundRef} />
            <Inner>
                <Left>
                    <Title>Дерзкий, атлетичный, но элегантный</Title>
                    <Caption>
                        Дерзкий, атлетичный, но элегантный, подчеркивающий
                        фирменный стиль легендарного INFINITI FX
                    </Caption>
                </Left>
                <Right>
                    <Button>Записаться на тест-драйв</Button>
                </Right>
            </Inner>
        </WelcomeWrapper>
    );
};
