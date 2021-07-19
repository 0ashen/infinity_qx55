import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';
import { LogoWrapper } from '../../components/Logo/Logo.styled';
import { pxToVw } from '../../utils/pxToVw';
import { ButtonWrapper } from '../../ui/Button/Button.styled';

export const WelcomeWrapper = styled.div`
    overflow: hidden;
    opacity: 0;
    @media screen and (max-width: 1100px) {
        background-image: url('${require('../../media/images/welcome-background--mobile.jpg')
            .default}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
`;

export const Car = styled.div`
    canvas {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`;

export const Title = styled.div`
    font-weight: normal;
    font-size: 56px;
    line-height: 120%;
    letter-spacing: 0.1em;
    margin-bottom: 32px;
    max-width: 620px;
    text-transform: uppercase;

    @media screen and (max-width: 1000px) {
        font-size: ${pxToVw(56, 1000)};
        margin-bottom: ${pxToVw(32, 1000)};
    }

    p {
        display: inline-block;

        &:after {
            content: ' ';
        }

        span {
            display: inline-block;
            transform: translateY(80px);
            opacity: 0;
        }
    }
`;
export const Caption = styled.div`
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.8);
    max-width: 580px;
    @media screen and (max-width: 1100px) {
        margin-bottom: ${pxToVw(50, 1100)};
    }

    p {
        display: inline-block;

        &:after {
            content: ' ';
        }

        span {
            display: inline-block;
            transform: translateY(40px);
            opacity: 0;
        }
    }
`;
export const Inner = styled(Wrapper)`
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100vh;
    padding-bottom: 130px;
    @media screen and (max-width: 1516px) {
        width: 95%;
        padding-bottom: ${pxToVw(130)};
    }

    ${LogoWrapper} {
        margin-bottom: 75px;
        @media screen and (max-width: 1516px) {
            margin-bottom: 4.9vw;
        }
    }
`;
export const Left = styled.div`
    align-self: flex-end;
`;
export const Right = styled.div`
    align-self: flex-end;
    @media screen and (max-width: 1100px) {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    ${ButtonWrapper} {
        @media screen and (max-width: 1100px) {
            padding: 15px 35px;
            font-weight: 300;
        }
    }
`;
export const FooterGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
`;
export const CarModelTitle = styled.div`
    text-transform: uppercase;
    width: 100%;
    font-size: 200px;
    font-weight: normal;
    text-align: center;
    opacity: 0.7;
    margin-bottom: 100px;

    @media screen and (max-width: 1516px) {
        font-size: 12vw;
        text-align: left;
        margin-bottom: ${pxToVw(700)};
    }

    p {
        display: inline-block;

        &:not(:last-child):after {
            content: ' ';
        }

        span {
            display: inline-block;
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
