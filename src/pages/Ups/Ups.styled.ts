import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';

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
`;
export const Header = styled(Wrapper)`
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 21px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 47px;
`;
export const Navigation = styled(Wrapper)`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    row-gap: 20px;

    &:after {
        content: '';
        display: block;
        width: 294px;
        flex-shrink: 1;
        flex-basis: 250px;
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
`;

export const Slide = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
`;
export const Media = styled.div`
    width: 50%;
    flex-shrink: 0;

    & > div {
        width: 100%;
    }
`;
export const BodyRight = styled.div`
    padding-top: 31px;
    padding-left: 82px;
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
`;
