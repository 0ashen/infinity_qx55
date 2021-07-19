import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';
import { ButtonWrapper } from '../../ui/Button/Button.styled';

const background = require('../../media/images/form-background.jpg').default;
export const TestDriveFormWrapper = styled.div`
    background-image: url('${background}');
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
    margin-bottom: 103px;
    text-align: center;
`;
export const Inner = styled(Wrapper)`
    max-width: 688px;

    ${ButtonWrapper} {
        width: 100%;
    }
`;
export const Input = styled.input`
    width: 100%;
    background: transparent;
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    letter-spacing: 0.1em;
    margin-bottom: 40px;
    padding-bottom: 13px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    &::placeholder {
        text-transform: uppercase;
    }
`;
