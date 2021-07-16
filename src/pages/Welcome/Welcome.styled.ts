import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';
import { LogoWrapper } from '../../components/Logo/Logo.styled';

export const WelcomeWrapper = styled.div`
    overflow: hidden;
    opacity: 0;
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
    align-items: flex-start;
    align-content: flex-start;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 100vh;
    padding-bottom: 130px;

    ${LogoWrapper} {
        margin-bottom: 75px;
    }
`;
export const Left = styled.div`
    align-self: flex-end;
    margin-top: 100px;
`;
export const Right = styled.div`
    align-self: flex-end;
`;
export const CarModelTitle = styled.div`
    text-transform: uppercase;
    width: 100%;
    font-size: 200px;
    font-weight: normal;
    text-align: center;
    opacity: 0.7;

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
