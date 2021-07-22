import styled from 'styled-components';
import { ButtonWrapper } from '../../ui/Button/Button.styled';

const background = require('../../media/images/form-background.jpg').default;
export const TestDriveFormWrapper = styled.div`
    background-image: url('${background}');
    min-height: 110vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding-bottom: 50px;
`;
export const Title = styled.div`
    padding-top: 15px;
    margin-bottom: 24px;
    font-size: 44px;
    line-height: 120%;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
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
    max-width: 688px;
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
`;

export const SelectColorsWrapper = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .item {
        width: calc(50% - 15px);
        height: 200px;
        background: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 20px;
        position: relative;
        z-index: 0;

        &:nth-child(2) img {
            margin-top: 0;
        }

        img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            margin-top: 15px;
            pointer-events: none;
            z-index: -1;
        }

        .select-color {
            color: #000;
            cursor: pointer;
            width: 220px;
            background-color: #000;

            .select-color__control {
                background: none;
                border: none;
                color: #fff;
                box-shadow: none;
                cursor: pointer;
            }

            .select-color__indicator-separator {
                display: none;
            }

            .select-color__single-value {
                color: #fff;
                text-transform: uppercase;
                font-size: 14px;
                font-weight: bold;
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
