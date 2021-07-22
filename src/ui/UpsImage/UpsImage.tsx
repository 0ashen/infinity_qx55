import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { getImagePromise } from '../../utils/getImagePromise';
import { UpsImageType } from './UpsImage.type';

export const UpsImage: UpsImageType = ({ imgSrc, background, ...other }) => {

    const [imagePromiseResolveStatus, setImagePromiseResolveStatus] = useState({
        value: false,
    });

    useEffect(() => {
        getImagePromise(imgSrc)().then(() => {
            setImagePromiseResolveStatus({ value: true });
        });
        return () => {
            setImagePromiseResolveStatus({ value: false });
        };
    }, [imgSrc]);
    if (!imagePromiseResolveStatus.value) {
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
        return <div style={{ backgroundImage: `url(${imgSrc})` }} {...other} />;
    }
    return <img src={imgSrc} alt="" {...other} />;
};
