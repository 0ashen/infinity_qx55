import styled from 'styled-components';
import { ButtonWrapper } from '../../ui/Button/Button.styled';
import { pxToVw } from '../../utils/pxToVw';

const background = require('../../media/images/form-background.jpg').default;
export const TestDriveFormWrapper = styled.div`
    background-image: url('${background}');
    min-height: 110vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding-bottom: 50px;
    opacity: 0;
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
    font-size: 20px;
    line-height: 150%;
    margin-bottom: 35px;
    text-align: center;
`;
export const InnerForm = styled.form`
    width: 100%;
    margin: 0 auto;
    max-width: 710px;
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
        text-transform: uppercase;
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
