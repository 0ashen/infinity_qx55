import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { getImagePromise } from '../../utils/getImagePromise';
import { LazyImageType } from './LazyImage.type';

export const LazyImage: LazyImageType = ({ src, background, ...other }) => {
    const [promiseStatus, setPromiseStatus] = useState({
        value: false,
    });

    useEffect(() => {
        getImagePromise(src)().then(() => {
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
    if (background) {
        return <div style={{ backgroundImage: `url(${src})` }} {...other} />;
    }
    return <img src={src} alt="" {...other} />;
};
