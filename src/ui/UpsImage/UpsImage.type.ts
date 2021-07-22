import { HTMLAttributes, VFC } from 'react';

export type UpsImageType = VFC<
    { imgSrc: string } & (
        | ({ background?: true } & HTMLAttributes<HTMLDivElement>)
        | ({ background?: false } & HTMLAttributes<HTMLImageElement>)
    )
>;
