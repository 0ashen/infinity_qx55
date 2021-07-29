import styled from 'styled-components';
import { FONT_FAMILY } from '../../styles/common';

export const InfinitiSelectWrapper = styled.div`
    width: 100%;
    min-width: 230px;

    .caption {
        width: 100%;
        font-size: 15px;
        font-weight: 300;
        margin-bottom: 5px;
        text-transform: uppercase;
        color: gray;
    }

    .select {
        width: 100%;
        cursor: pointer;
        font-family: ${FONT_FAMILY.Helvetica};
        //margin-left: -10px;
        border-bottom: 1px solid #fff;

        &__input {
            color: #fff;
            font-size: 16px;

            input {
                font-weight: bold;
                font-family: ${FONT_FAMILY.Helvetica};
            }
        }

        &__option {
            cursor: pointer;
        }

        &__menu {
            color: #000;
            border: none;
        }

        &__control {
            background: none;
            border: none;
            cursor: pointer;
            border-radius: 0;
            //padding-left: 10px;
        }

        &__indicator-separator {
            display: none;
        }

        &__single-value {
            color: #fff;
            text-transform: uppercase;
            font-size: 16px;
            font-weight: bold;
        }

        &__value-container {
            padding-left: 0;
        }
    }

    .error {
        color: red;
        font-size: 15px;
    }
`;
