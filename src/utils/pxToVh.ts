export const pxToVh = (px: number, resolution: number = 950): string =>
    px / (resolution / 100) + 'vh';
