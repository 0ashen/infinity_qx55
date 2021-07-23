import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

function Component({ history }: { history: RouteComponentProps['history'] }) {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
        // eslint-disable-next-line
    }, []);

    return null;
}

export const ScrollToTopEveryTransition = withRouter(Component);
