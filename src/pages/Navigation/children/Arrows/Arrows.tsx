import React from 'react';
import { ArrowLeft, ArrowRight } from './Arrows.styled';

export const Arrows = () => {
    return (
        <>
            <ArrowLeft className="left-arrow">
                <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 1000 1000"
                    enableBackground="new 0 0 1000 1000"
                    style={{ transform: 'rotate(180deg)' }}
                >
                    <g>
                        <path
                            d="M427.3,500.4c0,160.2-39.4,311.2-109.1,443.8c-16.1,30.6,21.8,60.6,47.6,37.7l298.5-413.9c29.2-40.4,29.2-95,0-135.4L365.5,18c-25.7-22.8-63.9,7-47.8,37.4C387.7,188.3,427.3,339.7,427.3,500.4z"
                            fill="currentColor"
                        />
                    </g>
                </svg>
            </ArrowLeft>
            <ArrowRight className="right-arrow">
                <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 1000 1000"
                    enableBackground="new 0 0 1000 1000"
                >
                    <g>
                        <path
                            d="M427.3,500.4c0,160.2-39.4,311.2-109.1,443.8c-16.1,30.6,21.8,60.6,47.6,37.7l298.5-413.9c29.2-40.4,29.2-95,0-135.4L365.5,18c-25.7-22.8-63.9,7-47.8,37.4C387.7,188.3,427.3,339.7,427.3,500.4z"
                            fill="currentColor"
                        />
                    </g>
                </svg>
            </ArrowRight>
        </>
    );
};
