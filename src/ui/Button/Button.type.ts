import { MouseEventHandler, MutableRefObject, ReactNode } from 'react';
import { ROUTES_PATHS } from '../../App';

export enum ButtonPropsMode {
    red,
}

export type ButtonProps = {
    href?: ROUTES_PATHS;
    ref?: MutableRefObject<null>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    mode?: ButtonPropsMode;
};
