import { Inner, LogoWrapper } from './Logo.styled';
import React, { forwardRef, Ref } from 'react';
import { LogoProps } from './Logo.type';

const Component = (props: LogoProps, ref: Ref<HTMLDivElement>) => {
    return (
        <LogoWrapper ref={ref}>
            <Inner {...props}>
                <img
                    src={require('../../media/images/logo.svg').default}
                    alt="infinity logotype"
                    width="125"
                    height="56"
                />
            </Inner>
        </LogoWrapper>
    );
};

export const Logo: React.ForwardRefExoticComponent<
    LogoProps & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, LogoProps>(Component);
