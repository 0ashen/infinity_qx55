import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';
import { LogoProps } from './Logo.type';

export const LogoWrapper = styled.div`
    width: 100%;
`;

export const Inner = styled(Wrapper)<LogoProps>`
    padding-top: 27px;
    padding-bottom: 26px;
    display: flex;
    justify-content: center;
    border-bottom: ${({ border }) =>
        border !== false ? '1px solid rgba(255, 255, 255, 0.1)' : ''};

    img {
        user-select: none;
        pointer-events: none;
    }
`;
