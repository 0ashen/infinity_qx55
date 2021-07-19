import styled from 'styled-components';
import { LogoWrapper } from '../../components/Logo/Logo.styled';
import { BalloonWrapper } from './children/Balloon/Balloon.styled';
import { ButtonWrapper } from '../../ui/Button/Button.styled';

const cityMobile = require('../../media/images/city--mobile.jpg').default;

export const NavigationWrapper = styled.div`
    position: relative;
    opacity: 0;

    @media screen and (max-width: 1100px) {
        background-image: url('${cityMobile}');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        min-height: 100vh;
        .flickity-prev-next-button {
            top: 65% !important;
        }
    }

    ${LogoWrapper} {
        position: fixed;
        left: 0;
        z-index: 99;

        @media screen and (max-width: 1100px) {
            position: static;
        }
    }
`;
export const City = styled.div`
    height: 100vh;
    @media screen and (max-width: 1100px) {
        height: 350px;
    }
`;

export const Canvas = styled.div`
    position: relative;
`;
export const BalloonsWrapper = styled.div`
    padding-left: 50px;
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 1516px) {
        padding-left: 0;
    }

    .carousel {
        width: 100%;
        margin-top: 210px;

        .slide {
            width: 100%;
        }
    }
`;
export const Footer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-bottom: 30px;

    ${ButtonWrapper} {
        margin: 0 10px;
        @media screen and (max-width: 1100px) {
            margin-left: 0;
            margin-right: 0;
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
                width: 33.33%;
                position: fixed;
                bottom: 0;
                padding: 0;
                padding-left: 10px;
                padding-right: 10px;

                span {
                    font-size: 12px;
                    line-height: 110%;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    word-break: break-all;
                }
            }

            &:nth-child(1) {
                left: 0;
            }

            &:nth-child(2) {
                left: calc(33.33% - 1px);
                width: calc(33.33% + 2px);
            }

            &:nth-child(3) {
                left: 66.66%;
            }
        }
    }
`;

export const Inner = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${BalloonWrapper} {
        margin-top: 10vh;
        margin-left: 125px;
        margin-right: 125px;
        @media screen and (max-width: 1100px) {
            margin-left: auto !important;
            margin-right: auto !important;
            margin-top: 0 !important;
        }
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
