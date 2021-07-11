import { ButtonWrapper, Text } from './Button.styled';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { ButtonProps } from './Button.type';
import { InfinityLink } from '../InfinityLink/InfinityLink';

const Component: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
    { children, href, onClick },
    ref,
) => {
    const body = (
        <ButtonWrapper as={href ? 'p' : 'button'} onClick={onClick} ref={ref}>
            <Text>{children}</Text>
        </ButtonWrapper>
    );

    if (href) {
        return <InfinityLink to={href}>{body}</InfinityLink>;
    }
    return <>{body}</>;
};

export const Button = forwardRef(Component);
