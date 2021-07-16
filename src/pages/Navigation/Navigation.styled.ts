import styled from 'styled-components';
import { LogoWrapper } from '../../components/Logo/Logo.styled';
import { BalloonWrapper } from './children/Balloon/Balloon.styled';

export const NavigationWrapper = styled.div`
    position: relative;
    opacity: 0;

    ${LogoWrapper} {
        position: fixed;
        left: 0;
        z-index: 99;
    }
`;
export const City = styled.div`
    height: 100vh;
`;

export const Canvas = styled.div`
    position: relative;
`;
export const Inner = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 50px;
    display: flex;
    align-items: flex-start;

    ${BalloonWrapper} {
        margin-top: 10vh;
        margin-left: 125px;
        margin-right: 125px;
    }

    ${BalloonWrapper}:nth-child(even) {
        margin-top: 20vh;
    }

    ${BalloonWrapper}:nth-child(3n) {
        margin-top: 15vh;
    }

    ${BalloonWrapper}:first-child {
        margin-left: 107px;
    }
`;
