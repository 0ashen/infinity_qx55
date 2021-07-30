import React, { useEffect, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';
import { LazyVideoType } from './LazyVideo.type';
import { getVideoPromise } from '../../utils/getVideoPromise';

export const LazyVideo: LazyVideoType = ({ src, ...other }) => {
    const [promiseStatus, setPromiseStatus] = useState({
        value: false,
    });
    const ref = useRef<null | HTMLVideoElement>(null);

    useEffect(() => {
        getVideoPromise(src)().then(() => {
            setPromiseStatus({ value: true });
        });
        return () => {
            setPromiseStatus({ value: false });
        };
    }, [src]);
    if (!promiseStatus.value) {
        return (
            <Loader
                type="Oval"
                color="#fff"
                height={100}
                width={100}
                // @ts-ignore
                className={'loadspinner'}
            />
        );
    }
    return <video src={src} {...other} loop playsInline ref={ref} autoPlay muted />;
};
