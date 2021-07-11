import { Inner, LogoWrapper } from './Logo.styled';
import { forwardRef } from 'react';
import { LogoType } from './Logo.type';

const Component: LogoType = (props, ref) => {
    return (
        <LogoWrapper ref={ref}>
            <Inner>
                <img
                    src={require('../../media/images/logo.svg').default}
                    alt="infinity logotype"
                />
            </Inner>
        </LogoWrapper>
    );
};

export const Logo = forwardRef(Component);
