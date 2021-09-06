import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    MouseEventHandler,
    ReactNode,
} from 'react';

export enum ButtonPropsMode {
    red,
    withoutBorderWithIcon,
}

export type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    mode?: ButtonPropsMode;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;
