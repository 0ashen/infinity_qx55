import styled from 'styled-components';
import { Wrapper } from '../../ui/Wrapper';

export const LogoWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
`;

export const Inner = styled(Wrapper)`
    padding-top: 27px;
    padding-bottom: 26px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;

    img {
        user-select: none;
        pointer-events: none;
    }
`;
