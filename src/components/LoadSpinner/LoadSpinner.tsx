import { useEffect, useRef } from 'react';
import './LoadSpinner.scss';
import { LoadSpinnerType } from './LoadSpinner.type';
import { LoadSpinnerWrapper } from './LoadSpinner.styled';
import { useLocation } from 'react-router-dom';
import { findComponentForRoute } from '../../utils/findComponentForRoute';
import { routes } from '../../App';

export const LoadSpinner: LoadSpinnerType = () => {
    const { pathname } = useLocation();
    const { hasImportFinished, enableComponent } = findComponentForRoute(
        pathname,
        routes,
    );

    const videRef = useRef<null | HTMLVideoElement>(null);
    useEffect(() => {
        if (!videRef.current) return;
        const currentRef = videRef.current;
        currentRef.addEventListener('ended', handleAnimationEnd);

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            if (enableComponent) enableComponent();
        }

        return () => {
            currentRef.removeEventListener('ended', handleAnimationEnd);
        };

        function handleAnimationEnd(ev: Event) {
            // @ts-ignore
            this.play();
            if (enableComponent) enableComponent();
        }
    }, [enableComponent]);

    const classes = hasImportFinished
        ? ' fallback-fadeout '
        : ' fallback-fadein ';

    return (
        <LoadSpinnerWrapper className={classes}>
            <video
                ref={videRef}
                autoPlay
                src="/loader.mp4"
                preload="auto"
                muted
            />
            {/*<div className="fa fa-spinner spin" style={{ fontSize: '64px' }}>*/}
            {/*</div>*/}
        </LoadSpinnerWrapper>
    );
};
