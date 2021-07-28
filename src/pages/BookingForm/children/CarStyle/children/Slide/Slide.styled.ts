import styled from 'styled-components';

export const SlideWrapper = styled.div`
    width: 50%;
    padding: 0 10px;
    //min-height: 550px;
    @media screen and (max-width: 800px) {
        width: 100%;
        min-height: auto;
    }
    .inner {
        width: 100%;
        border: 1px solid transparent;
        padding: 14px 10px 15px;

        &.selected {
            border: 1px solid #fff;
        }

        .title {
            width: 100%;
            text-align: center;
            font-size: 15px;
        }

        .image {
            width: 100%;
            height: 100px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: ${1160 / 3.5}px ${652 / 3.5}px;
            margin-bottom: 8px;
        }
        .loadspinner {
            height: 100px;
            width: 100px;
            margin: 0 auto;
            margin-bottom: 8px;
            padding: 10px;
        }

        .price {
            text-align: center;
            padding-bottom: 19px;
            border-bottom: 2px solid #3b3b3b;
            font-size: 15px;
            font-weight: 400;

            span {
                font-size: 24px;
            }
        }

        .advantages {
            border-bottom: 2px solid #3b3b3b;
            &-button {
                width: 100%;
                text-align: center;
                text-transform: uppercase;
                font-size: 12px;
                padding-top: 10px;
                padding-bottom: 10px;
            }

            ul {
                padding-top: 10px;

                li {
                    font-size: 12px;
                    padding: 0 16px 16px;
                }
            }
        }

        .select {
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            text-transform: uppercase;
            color: #000;
            font-weight: bold;
            font-size: 14px;
            margin: 20px auto 0;
            padding: 0 25px;
            min-width: 168px;

            &.is-selected {
                background: transparent;
                color: #878787;
            }
        }
    }
`;
