import React from 'react';
import { RouteComponentProps } from 'react-router';

export const changePage = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    route: string,
    timeline: gsap.core.Timeline,
    history: RouteComponentProps['history'],
) => {
    e.preventDefault();
    timeline.reverse();
    const timelineDuration = timeline.duration() * 1000;
    //@ts-ignore
    // route.component.preload();
    setTimeout(() => {
        history.push(route);
    }, timelineDuration);
};
