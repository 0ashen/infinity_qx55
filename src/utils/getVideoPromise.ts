import { store } from 'react-notifications-component';

type cacheItem = {
    in: string;
    promise: Promise<String>;
    outUrl?: string;
    node?: HTMLVideoElement;
};
const cache: cacheItem[] = [];

export const getVideoPromise = (path: string) => {
    const isRequestAlreadyWas = cache.find((el) => el.in === path);
    if (isRequestAlreadyWas && !isRequestAlreadyWas.outUrl) {
        return () => isRequestAlreadyWas.promise;
    }
    return () => {
        const promise = new Promise<String>((res, rej) => {
            if (isRequestAlreadyWas && isRequestAlreadyWas.outUrl) {
                res(isRequestAlreadyWas.outUrl);
                return;
            }
            const video = document.createElement('video');

            const req = new XMLHttpRequest();
            req.open('GET', path, true);
            req.responseType = 'blob';

            req.onload = function () {
                if (this.status === 200) {
                    let videoBlob = this.response;
                    const url = URL.createObjectURL(videoBlob);
                    video.src = url;
                    const cachePath = cache.find((el) => el.in === path)!;
                    cachePath.outUrl = url;
                    cachePath.node = video;

                    res(url);
                }
            };
            req.onerror = function (error) {
                console.error(error);
                store.addNotification({
                    title: 'Упс!',
                    message: 'Что-то пошло не так!',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                    },
                });
                rej();
            };

            req.send();

            // @ts-ignore
            window[path.replace(/[^a-zа-яё]/gi, '')] = video;
        });
        cache.push({
            in: path,
            promise: promise,
        });
        return promise;
    };
};
