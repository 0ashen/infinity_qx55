import React, { VFC } from 'react';

export type LazyVideoType = VFC<
    { src: string } & React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
    >
>;
