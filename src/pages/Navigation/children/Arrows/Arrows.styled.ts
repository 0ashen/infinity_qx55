import styled from 'styled-components';
import { pxToVw } from '../../../../utils/pxToVw';

export const ArrowLeft = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: ${pxToVw(100)};
    height: 100%;
    background: rgba(0, 0, 0, 0.16);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.15s ease;
    @media screen and (max-width: 1100px) {
        display: none;
    }

    &:hover {
        background: rgba(0, 0, 0, 0.4);
    }

    &:hover svg {
        opacity: 1;
    }

    svg {
        opacity: 0.5;
        color: white;
        width: 100px;
        height: 100px;
    }
`;
export const ArrowRight = styled(ArrowLeft)`
    left: auto;
    right: 0;
`;
