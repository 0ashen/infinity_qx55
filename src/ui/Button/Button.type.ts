import { MouseEventHandler, MutableRefObject, ReactNode } from 'react';

export enum ButtonPropsMode {
    red,
}

export type ButtonProps = {
    ref?: MutableRefObject<null>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    mode?: ButtonPropsMode;
};
