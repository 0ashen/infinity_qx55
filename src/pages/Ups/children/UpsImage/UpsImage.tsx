import React, { useEffect, useState, VFC } from 'react';
import Loader from 'react-loader-spinner';
import { getImagePromise } from '../../../../utils/getImagePromise';

export const UpsImage: VFC<{ imgSrc: string }> = ({ imgSrc }) => {
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
                className={"loadspinner"}
            />
        );
    }
    return <img src={imgSrc} alt="" />;
};
