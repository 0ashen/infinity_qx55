import { MutableRefObject, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { DisplacementFilter } from '@pixi/filter-displacement';

export const use3DPhoto = (
    [image, imageDepth]: { title: string; url: string }[],
    ref: MutableRefObject<HTMLDivElement | null>,
) => {
    useEffect(() => {
        if (
            !PIXI.Loader.shared.resources[image.title] &&
            !PIXI.Loader.shared.resources[imageDepth.title]
        ) {
            PIXI.Loader.shared
                .add(image.title, image.url)
                .add(imageDepth.title, imageDepth.url)
                .load((loader, resources) => {
                    init();
                });
        } else {
            init();
        }
        let displacementFilter: DisplacementFilter;

        function init() {
            if (
                !PIXI.Loader.shared.resources[image.title] ||
                !PIXI.Loader.shared.resources[imageDepth.title]
            ) {
                throw Error('Ресурс не найдер в ПИКСИ!')
                return;
            }
            const app = new PIXI.Application({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            ref.current?.appendChild(app.view);

            const imageSprite = PIXI.Sprite.from(
                PIXI.Loader.shared.resources[image.title].texture!,
            );
            setImageCover(imageSprite, app);
            app.stage.addChild(imageSprite);

            const depthMapSprite = PIXI.Sprite.from(
                PIXI.Loader.shared.resources[imageDepth.title].texture!,
            );
            setImageCover(depthMapSprite, app);
            app.stage.addChild(depthMapSprite);

            displacementFilter = new PIXI.filters.DisplacementFilter(
                depthMapSprite,
            );
            app.stage.filters = [displacementFilter];

            window.addEventListener('mousemove', mouseMoveHandler);
        }

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        };

        function mouseMoveHandler(e: MouseEvent) {
            displacementFilter.scale.x =
                (window.innerWidth / 2 - e.clientX) / 80;
            displacementFilter.scale.y =
                (window.innerHeight / 2 - e.clientY) / 80;
        }
    }, [ref]);
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
