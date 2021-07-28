export const getVideoPromise = (path: string) => {
    return () => {
        return new Promise<void>((res, rej) => {
            const video = document.createElement('video');

            let req = new XMLHttpRequest();
            req.open('GET', path, true);
            req.responseType = 'blob';

            req.onload = function () {
                res();
                if (this.status === 200) {
                    let videoBlob = this.response;
                    video.src = URL.createObjectURL(videoBlob);
                }
            };
            req.onerror = function () {
                rej();
            };

            req.send();

            // @ts-ignore
            window[path.replace(/[^a-zа-яё]/gi, '')] = video;
        });
    };
};
