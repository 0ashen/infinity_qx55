import React, { VFC } from 'react';
import { FormErrorWrapper } from './FormError.styled';
import { FormErrorProps } from './FormError.type';

export const FormError: VFC<FormErrorProps> = ({ text }) => {
    if (!text) {
        return null;
    }
    return <FormErrorWrapper>{text}</FormErrorWrapper>;
};
