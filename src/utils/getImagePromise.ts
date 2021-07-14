export const getImagePromise = (path: string) => {
    return new Promise<void>((res, rej) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            res();
        };
        img.onerror = () => {
            rej();
        };
        // @ts-ignore
        window[path.replace(/[^a-zа-яё]/gi, '')] = img;
    });
};
