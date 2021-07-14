// import { useEffect, useState } from 'react';
//
// export const LoadSpinner = () => {
//     const delay = 200000; // 200ms
//     const [showLoadingIndicator, setLoadingIndicatorVisibility] =
//         useState(false);
//
//     useEffect(() => {
//         const timer = setTimeout(
//             () => setLoadingIndicatorVisibility(true),
//             delay,
//         );
//
//         // this will clear Timeout when component unmont like in willComponentUnmount
//         return () => {
//             clearTimeout(timer);
//         };
//     });
//
//     return <div style={{border: '10px solid red'}}>Loading</div> ;
//     // return showLoadingIndicator ? <div style={{border: '10px solid red'}}>Loading</div> : null;
// };

import { useEffect, useRef } from 'react';
import './LoadSpinner.scss';
import { LoadSpinnerType } from './LoadSpinner.type';
import { LoadSpinnerWrapper } from './LoadSpinner.styled';

export const LoadSpinner: LoadSpinnerType = ({
    hasImportFinished,
    enableComponent,
}) => {
    const videRef = useRef<null | HTMLVideoElement>(null);
    useEffect(() => {
        if (!videRef.current) return;
        const currentRef = videRef.current;
        currentRef.addEventListener('ended', handleAnimationEnd);

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
