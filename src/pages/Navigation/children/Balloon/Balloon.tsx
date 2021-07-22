import {
    BalloonWrapper,
    CircleWrapper,
    Gradient,
    RoundedLines,
    Text,
    WhiteCircle,
    Wing,
    WingPos,
} from './Balloon.styled';
import React, { useEffect, useRef, useState, VFC } from 'react';
import { gsap, Power1 } from 'gsap';

export const Balloon: VFC<{
    title: string | JSX.Element[];
    delay: number;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    imgUrl?: string;
}> = ({ title, delay, onClick, imgUrl }) => {
    const [done, setDone] = useState(false);

    const timeline1 = gsap.timeline({ paused: true, delay: delay });
    const circleGradient = useRef(null);
    const thinWhiteCircle = useRef(null);
    const text = useRef<null | HTMLDivElement>(null);
    const roundedLines = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        timeline1
            .to(
                circleGradient.current,
                {
                    duration: 0.85,
                    scale: 1,
                },
                0,
            )
            .to(
                circleGradient.current,
                {
                    duration: 0.7,
                    rotate: -110,
                },
                0.15,
            )
            .to(
                thinWhiteCircle.current,
                {
                    duration: 0.7,
                    scale: 1,
                },
                0.25,
            )
            .to(
                text.current!.querySelectorAll('span'),
                {
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    ease: Power1.easeInOut,
                    stagger: 0.01,
                },
                0,
            )
            .to(
                roundedLines.current,
                {
                    duration: 0.1,
                    opacity: 1,
                    onComplete: () => {
                        // setTimeout(() => {
                        //     setDone(true);
                        // }, 200);
                    },
                },
                0.1,
            )
            .to(
                roundedLines.current,
                {
                    duration: 1,
                    rotation: 120,
                },
                0.1,
            );
        timeline1.play();
    }, [delay, timeline1]);

    // wings
    const timeline2 = gsap.timeline({ paused: true });
    const wing1 = useRef<null | HTMLDivElement>(null);
    const wing2 = useRef<null | HTMLDivElement>(null);
    const wing3 = useRef<null | HTMLDivElement>(null);
    const wing4 = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        let duration = 1;
        timeline2
            .to(wing1.current, {
                delay: delay,
                width: '70px',
                duration: duration,
            })
            .to(
                wing2.current,
                {
                    width: '70px',
                    duration: duration,
                },
                '-=' + duration,
            )
            .to(
                wing3.current,
                {
                    width: '70px',
                    duration: duration,
                },
                '-=' + duration,
            )
            .to(
                wing4.current,
                {
                    width: '70px',
                    duration: duration,
                },
                '-=' + duration,
            );
        timeline2.play();
    }, [delay, timeline2]);
    return (
        <BalloonWrapper onClick={onClick}>
            <Text ref={text}>{title}</Text>
            <CircleWrapper>
                <Gradient ref={circleGradient} />
                <WhiteCircle
                    ref={thinWhiteCircle}
                    className={done ? 'WhiteCircleDone' : ''}
                    style={{ backgroundImage: `url(${imgUrl})` }}
                />
                <Wing position={WingPos.topLeft} ref={wing1} />
                <Wing position={WingPos.topRight} ref={wing2} />
                <Wing position={WingPos.bottomLeft} ref={wing3} />
                <Wing position={WingPos.bottomRight} ref={wing4} />
                <RoundedLines
                    ref={roundedLines}
                    className={done ? 'RoundedLinesDone' : ''}
                />
            </CircleWrapper>
        </BalloonWrapper>
    );
};
