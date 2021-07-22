export const getImagePromise = (path: string, testReject?: boolean) => {
    return () => {
        return new Promise<void>((res, rej) => {
            const img = new Image();
            img.src = path;
            if (!testReject) {
                img.onload = () => {
                    res();
                };
            }
            img.onerror = () => {
                rej();
            };
            if (testReject) {
                setTimeout(() => {
                    rej();
                }, 100);
            }
            // @ts-ignore
            window[path.replace(/[^a-zа-яё]/gi, '')] = img;
        });
    };
};
