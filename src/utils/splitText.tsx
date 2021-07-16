import React from 'react';

export const splitText = (text: string): JSX.Element[] =>
    text.split(' ').map((el, idx) => (
        <p key={idx}>
            {el.split('').map((el, idx) => {
                if (el === ' ') {
                    return <span key={idx}> </span>;
                }
                return <span key={idx}>{el}</span>;
            })}
        </p>
    ));
