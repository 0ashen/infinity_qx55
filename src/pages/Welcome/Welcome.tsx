import { Car, WelcomeWrapper } from './Welcome.styled';
import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import qx55 from '../../media/images/welcome-background.jpg';
import qx55__map from '../../media/images/welcome-background--map4.jpg';
export const Welcome = () => {
    const [backgroundRef, setBackgroundRef] = useState<null | HTMLDivElement>(
        null,
    );

    useEffect(() => {
        if (!backgroundRef) return;
        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        backgroundRef.appendChild(app.view);
        // @ts-ignore
        let img = new PIXI.Sprite.from(qx55);
        img.width = window.innerWidth;
        img.height = window.innerHeight;
        app.stage.addChild(img);

        // @ts-ignore
        let depthMap = new PIXI.Sprite.from(qx55__map);
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
            <Car
                ref={(instance) => {
                    setBackgroundRef(instance);
                }}
            />
        </WelcomeWrapper>
    );
};
