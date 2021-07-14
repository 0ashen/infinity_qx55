import React from 'react';
import { routeType } from '../App';
import { RouteComponentProps } from 'react-router';

export const changePage = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    route: routeType,
    timeline: gsap.core.Timeline,
    history: RouteComponentProps['history']
) => {
    e.preventDefault();
    timeline.reverse();
    const timelineDuration = timeline.duration() * 1000;
    //@ts-ignore
    // route.component.preload();
    setTimeout(() => {
        history.push(route.path);
    }, timelineDuration);
};
