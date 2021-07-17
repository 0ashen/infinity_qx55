export const pxToVw = (px: number, resolution: number = 1516): string =>
    px / (resolution / 100 + 0.17) + 'vw';
