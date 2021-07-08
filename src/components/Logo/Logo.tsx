import { Inner, LogoWrapper } from './Logo.styled';
import { VFC } from 'react';

export const Logo: VFC = () => {
    return (
        <LogoWrapper>
            <Inner>
                <img
                    src={require('../../media/images/logo.svg').default}
                    alt="infinity logotype"
                />
            </Inner>
        </LogoWrapper>
    );
};
