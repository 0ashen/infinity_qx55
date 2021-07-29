import { HTMLAttributes, VFC } from 'react';

export type LazyImageType = VFC<
    { src: string } & (
        | ({ background?: true } & HTMLAttributes<HTMLDivElement>)
        | ({ background?: false } & HTMLAttributes<HTMLImageElement>)
    )
>;
