import { RouteComponentProps } from 'react-router';

export type FooterNavigationProps = {
    timeline: gsap.core.Timeline;
    history: RouteComponentProps['history'];
    id: number;
    reset?: () => void;
};
