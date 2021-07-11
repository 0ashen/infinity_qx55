import { Link } from 'react-router-dom';
import React from 'react';
import { InfinityLinkProps } from './InfinityLink.type';

export const InfinityLink = (props: InfinityLinkProps) => (
    <Link {...props} >
        {props.children}
    </Link>
);
