import { GetBack, Inner, LogoWrapper } from './Logo.styled';
import React, { forwardRef, Ref } from 'react';
import { LogoProps } from './Logo.type';

const Component = (props: LogoProps, ref: Ref<HTMLDivElement>) => {
    return (
        <LogoWrapper ref={ref}>
            <Inner {...props}>
                {props.getBack && (
                    <GetBack onClick={props.getBack.onClick}>
                        <span />
                        <div>{props.getBack.title}</div>
                    </GetBack>
                )}
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
