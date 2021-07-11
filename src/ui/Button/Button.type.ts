import { MouseEventHandler, MutableRefObject, ReactNode } from 'react';
import { ROUTES_PATH } from '../../App';

export type ButtonProps = {
    href?: ROUTES_PATH;
    ref?: MutableRefObject<null>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
};
