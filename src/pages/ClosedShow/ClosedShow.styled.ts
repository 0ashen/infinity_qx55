import styled from 'styled-components';
import { ButtonWrapper } from '../../ui/Button/Button.styled';
import { pxToVw } from '../../utils/pxToVw';


export const ButtonText = styled.div`
    font-size: 17px;
    padding-bottom: 20px;
    text-align: center;
`;

export const SubscribeToNewsFormWrapper = styled.div`
    min-height: 110vh;
    padding-bottom: 50px;
    opacity: 0;
    overflow: hidden;
`;
export const Title = styled.div`
    padding-top: 15px;
    margin-bottom: 24px;
    font-size: 44px;
    line-height: 120%;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    @media screen and (max-width: 1100px) {
        font-size: ${pxToVw(80, 1100)};
    }
`;
export const Caption = styled.div`
    padding-top: 15px;
    margin-bottom: 24px;
    font-size: 20px;
    line-height: 120%;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    @media screen and (max-width: 1100px) {
        font-size: ${pxToVw(40, 1100)};
    }
`;
export const InnerForm = styled.form`
    width: 100%;
    margin: 0 auto;
    max-width: 710px;
    position: relative;
    z-index: 0;
    @media screen and (max-width: 1516px) {
        width: 95%;
    }

    ${ButtonWrapper} {
        width: 100%;
    }

    .text-input-phone-wrapper {
        margin-bottom: 30px;
    }

    .text-input-phone {
        width: 100%;
        background: transparent;
        font-weight: 300;
        font-size: 20px;
        line-height: 150%;
        text-align: center;
        letter-spacing: 0.1em;
        padding-bottom: 13px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        outline: none;

        &::placeholder {
            text-transform: uppercase;
        }
    }

    .legal-inforamtion {
        font-size: 9px;
        padding-top: 10px;
    }

    video {
        width: 200%;
        margin-top: -200px;
        margin-bottom: -100px;
        transform: translateX(calc(-100% / 200 * (200 / 4)));
        position: relative;
        z-index: -1;
        @media screen and (max-width: 1100px) {
            width: 100%;
            transform: translateX(0);
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    .diller-and-date {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
        column-gap: 15px;
        @media screen and (max-width: 1100px) {
            flex-direction: column;
        }
        & > * {
            width: 48%;
            @media screen and (max-width: 1100px) {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }
`;

export const Errors = styled.div`
    color: red;

    p {
        margin-bottom: 15px;
    }
`;
export const AcceptTerms = styled.div`
    margin-bottom: 20px;

    .acceptTerms__error {
        color: red;
        padding-top: 10px;
        text-align: center;
        margin-bottom: 20px;
    }

    .inner {
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        .form-check-input {
            width: 30px;
            height: 30px;
            margin-right: 15px;
            cursor: pointer;
        }

        label {
            cursor: pointer;
        }
    }
`;

export const DateRange = styled.div`
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    flex-shrink: 0;
    @media screen and (min-width: 1101px) {
        width: 100% !important;
        margin-top: 20px;
    }
    .caption {
        width: 100%;
        font-size: 15px;
        font-weight: 300;
        margin-bottom: 15px;
        text-transform: uppercase;
        color: gray;
        text-align: left;
        @media screen and (min-width: 1101px) {
            text-align: center;
        }
    }
    .value {
        font-size: 25px;
        @media screen and (min-width: 1101px) {
            text-align: center;
        }
    }
`;
