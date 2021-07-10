import { ButtonWrapper, Text } from './Button.styled';
import { FC } from 'react';
import { ButtonProps } from './Button.type';

export const Button: FC<ButtonProps> = ({ children }) => {
    return (
        <ButtonWrapper>
            <Text>{children}</Text>
        </ButtonWrapper>
    );
};
