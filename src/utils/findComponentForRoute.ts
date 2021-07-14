import { matchPath } from 'react-router-dom';
import { routes } from '../App';

export const findComponentForRoute = (
    path: string,
    routesSet: typeof routes,
) => {
    const matchingRoute = routesSet.find((route) =>
        matchPath(path, {
            path: route.path,
            exact: route.exact,
        }),
    );
    if (!matchingRoute) {
        throw Error('Путь не найдет!')
        // eslint-disable-next-line no-unreachable
        alert('Путь не найден!')
    }
    return matchingRoute!;
};
