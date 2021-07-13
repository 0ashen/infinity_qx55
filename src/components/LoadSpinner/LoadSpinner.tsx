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

export const LoadSpinner: LoadSpinnerType = ({
    hasImportFinished,
    enableComponent,
}) => {
    const ref = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        const currentRef = ref.current;
        ref.current.addEventListener('animationend', handleAnimationEnd);

        return () => {
            currentRef.removeEventListener('animationend', handleAnimationEnd);
        };

        function handleAnimationEnd(ev: AnimationEvent) {
            if (ev.animationName === 'fadeout') {
                enableComponent();
            }
        }
    }, [enableComponent]);

    const classes = hasImportFinished ? 'fallback-fadeout' : 'fallback-fadein';

    return (
        <div ref={ref} className={classes}>
            <i className="fa fa-spinner spin" style={{ fontSize: '64px' }}>
                123
            </i>
        </div>
    );
};
