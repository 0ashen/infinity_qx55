import { ButtonWrapper, Text } from './Button.styled';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { ButtonProps } from './Button.type';

const Component: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
    { children, ...other },
    ref,
) => {
    return (
        <ButtonWrapper ref={ref} {...other}>
            <Text>{children}</Text>
        </ButtonWrapper>
    );
};

export const Button = forwardRef(Component);
