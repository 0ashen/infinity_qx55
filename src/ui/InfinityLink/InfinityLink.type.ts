import { LinkProps } from 'react-router-dom';
import { ReactNode, RefAttributes } from 'react';
import { ROUTES_PATH } from '../../App';

export type InfinityLinkProps = LinkProps &
    RefAttributes<HTMLAnchorElement> & {
        children?: ReactNode;
        onClick?: () => void;
        to: ROUTES_PATH;
    };
