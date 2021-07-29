import styled from 'styled-components';

export const CarStyleWrapper = styled.div`
    background-color: #1a1a1a;
    padding-top: 31px;
    margin-bottom: 30px;

    .slider {
        width: 100%;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 100px;
        @media screen and (max-width: 1100px) {
            padding-left: 0;
            padding-right: 0;
        }
        @media screen and (max-width: 800px) {
            margin-bottom: 30px;
        }

        .flickity-button {
            background: none;
            color: #fff;
        }
    }
`;

export const Exterior = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
    }

    .title {
        width: 180px;
        font-size: 12px;
        padding-left: 24px;
        font-weight: 400;
        @media screen and (max-width: 800px) {
            margin-bottom: 20px;
        }
    }

    .body {
        display: flex;
        @media screen and (max-width: 800px) {
            flex-wrap: wrap;
            row-gap: 15px;
            padding-left: 15px;
            padding-right: 15px;
        }

        .item {
            margin-right: 12px;
            padding: 4px;
            border: 1px solid transparent;
            border-radius: 50%;
            cursor: pointer;
            width: 50px;
            position: relative;
            flex-shrink: 0;

            &.is-active {
                border: 1px solid #fff;
            }

            .image {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                background-position: center;
                background-size: cover;
            }

            &:hover p {
                opacity: 1;
                pointer-events: auto;
            }

            p {
                font-size: 14px;
                text-align: center;
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                text-transform: uppercase;
                width: 150px;
                opacity: 0;
                pointer-events: none;
                margin-bottom: 20px;
                @media screen and (max-width: 800px) {
                    display: none;
                }
            }
        }
    }
`;
export const Interior = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 65px;

    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
    }

    .title {
        width: 180px;
        font-size: 12px;
        padding-left: 24px;
        font-weight: 400;
        @media screen and (max-width: 800px) {
            margin-bottom: 20px;
        }
    }

    .body {
        display: flex;
        @media screen and (max-width: 800px) {
            flex-wrap: wrap;
            row-gap: 15px;
            padding-left: 15px;
            padding-right: 15px;
        }

        .item {
            margin-right: 12px;
            padding: 4px;
            border: 1px solid transparent;
            border-radius: 50%;
            cursor: pointer;
            width: 50px;
            position: relative;
            flex-shrink: 0;

            &.is-active {
                border: 1px solid #fff;
            }

            .image {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                background-position: center;
                background-size: cover;
            }

            &:hover p {
                opacity: 1;
            }

            p {
                font-size: 14px;
                text-align: center;
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                text-transform: uppercase;
                width: 150px;
                margin-top: 20px;
                opacity: 0;
                pointer-events: none;
                @media screen and (max-width: 800px) {
                    display: none;
                }
            }
        }
    }
`;

export const Dialer = styled.div`
    padding-bottom: 60px;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;

    @media screen and (max-width: 1100px) {
        flex-direction: column;
        & > *:not(:last-child) {
            margin-bottom: 30px;
        }
    }

    .item {
        margin-right: 15px;
    }
`;
