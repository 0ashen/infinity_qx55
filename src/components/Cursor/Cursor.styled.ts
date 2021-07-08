import styled from 'styled-components';

export const CursorInner = styled.div`
    position: fixed;
    border-radius: 50%;
    border: 2px solid #fff;
    width: 42px;
    height: 42px;
    left: 20px;
    right: 0;
    transition: transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease,
        background-color 0.2s ease;
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
        content: '';
        width: 5px;
        height: 5px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 50%;
    }
`;
