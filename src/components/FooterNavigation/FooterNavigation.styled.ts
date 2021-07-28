import styled from 'styled-components';
import { ButtonWrapper } from '../../ui/Button/Button.styled';

export const FooterNavigationWrapper = styled.div`
    margin-top: auto;
    width: 100%;
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 1100px) {
        flex-wrap: wrap;
        gap: 15px;
        padding-bottom: 25px;
    }

    ${ButtonWrapper} {
        padding: 20px 30px;
        transition: opacity 0.07s ease-in;

        &:hover {
            opacity: 0.8;
        }

        &:active {
            opacity: 0.6;
        }

        @media screen and (max-width: 1100px) {
            &:nth-child(2),
            &:nth-child(3) {
                width: 50%;
                position: fixed;
                bottom: 0;
                padding: 0 10px;

                span {
                    font-size: 12px;
                    line-height: 140%;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            &:nth-child(2) {
                left: 0;
            }

            &:nth-child(3) {
                left: calc(50% - 1px);
                width: calc(50% + 1px);
            }
        }
    }
`;

export const LeftButton = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
        order: 1;
        width: 47%;
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
export const RightButton = styled(LeftButton)`
    @media screen and (max-width: 1100px) {
        justify-content: flex-end;
    }

    span {
        order: 1;
        margin-right: 0;
        margin-left: 15px;

        &:before {
            transform: rotate(-135deg);
            margin-right: 3px;
            margin-left: 0;
        }
    }
`;
