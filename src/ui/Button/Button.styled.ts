import styled, { css } from 'styled-components';
import { ButtonProps, ButtonPropsMode } from './Button.type';

export const ButtonWrapper = styled.button<ButtonProps & { ref: any }>`
    border: 1px solid rgba(255, 255, 255, 0.168);
    background: rgba(255, 255, 255, 0.06);
    mix-blend-mode: normal;
    backdrop-filter: blur(5px);
    padding: 41px 45px 42px;

    &[disabled] {
        opacity: 0.5;
        color: gray;
    }

    ${({ mode }) => {
        if (mode === ButtonPropsMode.withoutBorderWithIcon) {
            return css`
                @media screen and (min-width: 1100px) {
                    // border: none;
                    // background: none;
                    padding: 10px 25px;
                }
            `;
        }
    }}

    svg {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        display: inline-block;
        vertical-align: middle;
 
        @media screen and (max-width: 1100px) {
            width: 35px;
            height: 35px;
            margin-right: 5px;
        }

        @media screen and (max-height: 600px) {
            width: 35px;
            height: 35px;
            margin-right: 5px;
        }
    }
`;

export const Text = styled.span`
    font-size: 13px;
    font-weight: bold;
    line-height: 150%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;
