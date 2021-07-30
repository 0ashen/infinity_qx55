import React from 'react';

export type LogoProps = {
    border?: boolean;
    getBack?: {
        title: string;
        onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    };
    showSlogan?: boolean;
};
