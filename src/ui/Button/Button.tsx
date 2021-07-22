import { ButtonWrapper, Text } from './Button.styled';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { ButtonProps } from './Button.type';

const Component: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
    { children, onClick },
    ref,
) => {
    return (
        <ButtonWrapper onClick={onClick} ref={ref}>
            <Text>{children}</Text>
        </ButtonWrapper>
    );
};

export const Button = forwardRef(Component);
