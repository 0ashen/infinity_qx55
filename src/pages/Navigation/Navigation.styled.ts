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
        margin-top: 130px;

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

    @media screen and (max-width: 1100px) {
        flex-wrap: wrap;
        row-gap: 20px;
        position: static;
        padding-top: 30px;
    }

    ${ButtonWrapper} {
        margin: 0 10px;
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
