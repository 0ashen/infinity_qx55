import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';
import { ButtonWrapper } from '../../ui/Button/Button.styled';

const backgroundImage =
    require('../../media/images/ups-background.jpg').default;
export const UpsWrapper = styled.div`
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    min-height: 100vh;
    width: 100%;
    opacity: 0;
    padding-top: 113px;
    display: flex;
    flex-direction: column;
`;

export const Inner = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: flex-start;

    .carousel {
        width: 100%;
    }

    iframe {
        width: 100%;
        height: 40vw;
        @media screen and (max-width: 1100px) {
            height: 80vw;
        }
    }
`;
export const Header = styled(Wrapper)`
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 21px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 47px;
    @media screen and (max-width: 1100px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
export const Navigation = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    row-gap: 20px;
    @media screen and (max-width: 1100px) {
        justify-content: space-around;
    }

    &:after {
        content: '';
        display: block;
        width: 294px;
        flex-shrink: 1;
        flex-basis: 230px;
        height: 1px;
    }
`;
export const NavigationItem = styled.div`
    width: 294px;
    flex-shrink: 1;
    flex-basis: 230px;
    min-height: 106px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 20px 15px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 145%;
    text-transform: uppercase;
    color: #ffffff;
    backdrop-filter: blur(5px);
    letter-spacing: 0.5px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
        padding: 10px;
        font-size: 15px;
        letter-spacing: 0.1px;
        min-height: 50px;
    }
`;
export const Section = styled.div`
    font-style: normal;
    font-weight: 300;
    font-size: 22px;
    line-height: 130%;
    text-transform: uppercase;
    color: #ffffff;
    max-width: 250px;
    width: 100%;
    flex-shrink: 0;
    align-self: center;
    padding-bottom: 20px;
    @media screen and (max-width: 1100px) {
        align-self: flex-start;
    }
`;

export const Slide = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    padding-bottom: 75px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    @media screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;
export const Media = styled.div`
    width: 50%;
    flex-shrink: 0;
    min-height: 414px;
    @media screen and (max-width: 1100px) {
        width: 100%;
    }

    .slide {
        width: 100%;
        height: 100%;
        padding-top: 54.65%;
        position: relative;

        & > * {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;
export const BodyRight = styled.div`
    padding-top: 31px;
    padding-left: 82px;
    @media screen and (max-width: 1100px) {
        padding-left: 0;
    }

    ${ButtonWrapper} {
        background-color: #b00417;
        padding: 30px 40px;
    }
`;
export const Title = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 120%;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 24px;
`;
export const Description = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 150%;
    margin-bottom: 46px;
`;
export const FooterNavigation = styled.div`
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
        @media screen and (max-width: 1100px) {
            width: calc(50% - 8px);
            &:nth-child(4) {
                width: 100%;
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
        width: 48%;
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

        &:before {
            content: '';
            width: 10px;
            height: 10px;
            border-bottom: 2px solid #fff;
            border-left: 2px solid #fff;
            display: block;
            transform: rotate(45deg);
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
        }
    }
`;
