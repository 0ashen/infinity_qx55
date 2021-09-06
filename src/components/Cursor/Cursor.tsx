import { CursorInner } from './Cursor.styled';
import { useEffect, useState, VFC } from 'react';

export const Cursor: VFC = () => {
    const [ref, setRef] = useState<null | HTMLDivElement>(null);

    useEffect(() => {
        if (!ref) return;

        function mouseDownHandler() {
            ref!.style.transform = 'scale(1.5)';
        }

        function mouseMoveHandler(e: any) {
            ref!.style.left = e.clientX - ref!.offsetWidth / 2 + 'px';
            ref!.style.top = e.clientY - ref!.offsetHeight / 2 + 'px';
            ref!.style.opacity = (1).toString();
        }

        function mouseUpHandler(e: any) {
            ref!.style.transform = 'scale(1)';
            if (e.target.classList.contains('link')) {
                ref!.style.transform = 'scale(5)';
                ref!.style.opacity = (0).toString();
            }
        }

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        };
    }, [ref]);

    // const link = document.querySelector('.link')!;
    // link.addEventListener('mouseenter', function linkEnterHandler() {
    //     circle.style.transform = "scale(1.5)";
    //     circle.style.borderColor = '#e71d36';
    //     circle.style.backgroundColor = "rgba(255, 0, 0, .2)";
    // });
    // link.addEventListener('mouseleave', function linkLeaveHandler() {
    //     circle.style.transform = "scale(1)";
    //     circle.style.borderColor = '#fdfffc';
    //     circle.style.backgroundColor = "rgba(255, 0, 0, 0)";
    //     ;
    // });

    return <CursorInner ref={(instance) => setRef(instance)} />;
};
