import React, { useEffect, useRef } from 'react';
import './LoadSpinner.scss';
import { LoadSpinnerType } from './LoadSpinner.type';
import { LoadSpinnerWrapper } from './LoadSpinner.styled';
import { useLocation } from 'react-router-dom';
import { findComponentForRoute } from '../../utils/findComponentForRoute';
import { routes } from '../../App';
import { isMobile } from 'react-device-detect';

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

    useEffect(() => {
        if (isMobile && enableComponent) {
            enableComponent();}
    }, [enableComponent]);

    const classes = hasImportFinished
        ? ' fallback-fadeout '
        : ' fallback-fadein ';
    return (
        <LoadSpinnerWrapper className={classes}>
            {isMobile ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        fontSize: '10vw',
                    }}
                >
                    <p>Загрузка...</p>
                </div>
            ) : (
                <video
                    ref={videRef}
                    autoPlay
                    src={'/loader.mp4'}
                    preload="auto"
                    muted
                />
            )}
        </LoadSpinnerWrapper>
    );
};
