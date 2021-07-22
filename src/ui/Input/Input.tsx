import React, { VFC } from 'react';
import { FormError } from '../FormError/FormError';
import { Inner, WrapperInput } from './Input.styled';
import { InputProps } from './Input.type';

export const Input: VFC<InputProps> = ({ error, ...props }) => {
    return (
        <WrapperInput>
            <Inner>
                <input {...props} />
            </Inner>
            <FormError text={error} />
        </WrapperInput>
    );
};
