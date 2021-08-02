import styled, { css } from 'styled-components';
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
    position: relative;

    ${({ showSlogan }) => {
        if (showSlogan) {
            return css`
                flex-direction: column;
                align-items: center;
            `;
        }
    }}
    a {
        img {
            user-select: none;
            pointer-events: none;
        }

        ${({ getBack }) => {
            if (getBack) {
                return css`
                    @media screen and (max-width: 1100px) {
                        margin-left: auto;
                    }
                `;
            }
        }}
    }
`;

export const GetBack = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: auto;
    left: 0;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    @media screen and (max-width: 1100px) {
        width: 47%;
        position: static;
        transform: translateY(0%);
    }
    transition: opacity 0.07s ease-in;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.6;
    }

    &.hide {
        opacity: 0;
        pointer-events: none;
    }

    div {
        white-space: nowrap;
    }

    span {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        &:before {
            content: '';
            width: 10px;
            height: 10px;
            border-bottom: 2px solid #fff;
            border-left: 2px solid #fff;
            display: block;
            transform: rotate(45deg);
            margin-left: 3px;
        }
    }
`;

export const Slogan = styled.div`
    padding-top: 40px;

    b {
        text-transform: uppercase;
        font-size: 14px;
        text-align: center;
        padding-bottom: 7px;
        display: block;
    }

    p {
        text-align: center;
        font-size: 31px;
        text-transform: uppercase;
    }
    @media screen and (max-width: 1100px) {
        padding-top: 25px;
    }
`;
