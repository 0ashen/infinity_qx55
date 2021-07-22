import styled from 'styled-components';

export const WrapperInput = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

export const Inner = styled.label`
    position: relative;
    width: 100%;
    display: block;

    input {
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
