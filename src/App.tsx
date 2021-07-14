import React, { VFC } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LoadSpinner } from './components/LoadSpinner/LoadSpinner';
import { lazyComponent, useAnimRoute } from './hooks/useAnimRoute';
import { findComponentForRoute } from './utils/findComponentForRoute';
import { getImagePromise } from './utils/getImagePromise';

export enum ROUTES_PATHS {
    HOME_WELCOME = '/',
    NAVIGATION = '/navigation',
}

export type routeType = {
    path: ROUTES_PATHS;
    exact: boolean;
    component?: lazyComponent;
    hasImportFinished?: boolean;
    enableComponent?: () => void;
    relatedMedia: Promise<any>[];
    module: () => Promise<{ default: VFC<any> }>;
};
// todo optimize images
export const routes: routeType[] = [
    {
        path: ROUTES_PATHS.HOME_WELCOME,
        exact: true,
        relatedMedia: [
            getImagePromise(
                require('./media/images/welcome-background.jpg').default,
            ),
            getImagePromise(
                require('./media/images/welcome-background--map8.jpg').default,
            ),
        ],
        module: () =>
            import(
                /* webpackChunkName: 'Welcome' */ './pages/Welcome/Welcome'
            ).then((module) => ({ default: module.Welcome })),
    },
    {
        path: ROUTES_PATHS.NAVIGATION,
        exact: true,
        relatedMedia: [],
        module: () =>
            import(
                /* webpackChunkName: 'Navigation' */ './pages/Navigation/Navigation'
            ).then((module) => ({ default: module.Navigation })),
    },
];

export const App = () => {
    // todo refactoring
    const { pathname } = useLocation();
    useAnimRoute(routes[0]);
    useAnimRoute(routes[1]);

    const currentRoute = findComponentForRoute(pathname, routes);

    return (
        <React.Suspense
            fallback={
                <LoadSpinner
                    hasImportFinished={currentRoute.hasImportFinished}
                    enableComponent={currentRoute.enableComponent}
                />
            }
        >
            <Switch key="router">
                {routes.map((route) => {
                    return (
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    );
                })}
            </Switch>
        </React.Suspense>
    );
};
