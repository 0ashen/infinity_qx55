import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';

export const WelcomeWrapper = styled(Wrapper)`
    overflow: hidden;
    padding-top: 28.7%;
`;

export const Car = styled.div`
    canvas {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`;

export const Title = styled.div`
    font-weight: normal;
    font-size: 56px;
    line-height: 120%;
    letter-spacing: 0.1em;
    margin-bottom: 32px;
    max-width: 597px;
    text-transform: uppercase;
`;
export const Caption = styled.div`
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.8);
    max-width: 536px;
`;

export const Inner = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
export const Left = styled.div``;
export const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;
