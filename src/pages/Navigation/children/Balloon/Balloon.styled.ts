import styled, { css } from 'styled-components';

export const CircleWrapper = styled.div`
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    position: relative;
`;
export const RoundedLines = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='259' height='211' viewBox='0 0 259 211' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg style='mix-blend-mode:overlay' filter='url(%23filter0_d)'%3E%3Cpath d='M63.0369 20.0102C47.9012 32.4066 36.0555 49.1752 29.6617 69.2007C23.2678 89.2262 23.2044 109.757 28.356 128.631L29.501 125.045C25.2583 107.384 25.639 88.3752 31.5669 69.809C37.4948 51.2429 48.1999 35.5307 61.892 23.5961L63.0369 20.0102Z' fill='white' fill-opacity='0.8'/%3E%3Cpath d='M196.349 179.402C210.482 167.374 221.534 151.377 227.594 132.397C233.654 113.418 233.917 93.9757 229.369 75.9838L230.494 72.4617C235.956 91.6402 236.019 112.586 229.499 133.006C222.979 153.426 210.79 170.46 195.225 182.924L196.349 179.402Z' fill='white' fill-opacity='0.8'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d' x='0.664062' y='0.0102081' width='257.833' height='210.914' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='12'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    opacity: 0;

    &.RoundedLinesDone {
        transition: transform 0.15s ease-out;
    }
`;
export const WhiteCircle = styled.div`
    width: 162px;
    height: 162px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &.WhiteCircleDone {
        transition: transform 0.15s ease-out;
    }
`;
export const Text = styled.div`
    text-align: center;
    margin-bottom: 25px;
    font-size: 18px;
    line-height: 145%;

    font-style: normal;
    font-weight: normal;
    text-transform: uppercase;

    p {
        display: inline-block;

        &:after {
            content: ' ';
        }

        span {
            display: inline-block;
            transform: translateY(35px);
            opacity: 0;
        }
    }
`;
export const Gradient = styled.div`
    //background: linear-gradient(
    //    180deg,
    //    rgba(255, 255, 255, 0.44) 0%,
    //    rgba(0, 0, 0, 0) 61.77%
    //);
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(68, 105, 113, 0) 61.77%
    );
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0.44;
    transition: opacity 0.2s linear;
`;

export enum WingPos {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
}

export const Wing = styled.div<{
    position: WingPos;
}>`
    background-image: url("data:image/svg+xml,%3Csvg width='70' height='22' viewBox='0 0 70 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 21L23 1H70' stroke='%23fff'/%3E%3C/svg%3E%0A");
    width: 0px;
    height: 20px;
    position: absolute;
    ${({ position }) => {
        switch (position) {
            case WingPos.topLeft:
                return css`
                    right: 100%;
                    top: 15%;
                    transform: scaleX(-1);
                `;
            case WingPos.topRight:
                return css`
                    left: 100%;
                    top: 15%;
                `;
            case WingPos.bottomLeft:
                return css`
                    right: 100%;
                    bottom: 15%;
                    transform: scale(-1, -1);
                `;
            case WingPos.bottomRight:
                return css`
                    left: 100%;
                    bottom: 15%;
                    transform: scale(1, -1);
                `;
        }
    }}
`;

export const BalloonWrapper = styled.div`
    width: 253px;
    cursor: pointer;
    flex-shrink: 0;

    &:hover ${Gradient} {
        opacity: 0.9;
    }

    &:hover .WhiteCircleDone {
        transform: translate(-50%, -50%) scale(0.85) !important;
    }

    &:hover .RoundedLinesDone {
        transform: rotate(140deg) !important;
    }
`;
