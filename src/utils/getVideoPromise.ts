type cacheItem = {
    in: string;
    outUrl: string;
    node: HTMLVideoElement
}
const cache: cacheItem[] = [];
export const getVideoPromise = (path: string) => {

    return () => {
        return new Promise<String>((res, rej) => {
            const isRequestAlreadyWas = cache.find(el => el.in === path);
            if (isRequestAlreadyWas) {
                res(isRequestAlreadyWas.outUrl)
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
                    cache.push({
                        in: path,
                        outUrl: url,
                        node: video
                    })

                    res(url);
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
