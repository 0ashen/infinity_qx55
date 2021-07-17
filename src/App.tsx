import React, { VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoadSpinner } from './components/LoadSpinner/LoadSpinner';
import { lazyComponent, useLazyRoute } from './hooks/useLazyRoute';
import { getImagePromise } from './utils/getImagePromise';

export enum ROUTES_PATHS {
    HOME_WELCOME = '/',
    NAVIGATION = '/navigation',
    UPS = '/ups/',
    FORM = '/form',
}

export type routeType = {
    path: ROUTES_PATHS | string;
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
        relatedMedia: [
            getImagePromise(require('./media/images/city.jpg').default),
            getImagePromise(
                require('./media/images/city-depth-map.jpg').default,
            ),
        ],
        module: () =>
            import(
                /* webpackChunkName: 'Navigation' */ './pages/Navigation/Navigation'
            ).then((module) => ({ default: module.Navigation })),
    },
    {
        path: ROUTES_PATHS.UPS + ':id',
        exact: false,
        relatedMedia: [
            getImagePromise(
                require('./media/images/ups-background.jpg').default,
            ),
        ],
        module: () =>
            import(/* webpackChunkName: 'Ups' */ './pages/Ups/Ups').then(
                (module) => ({ default: module.Ups }),
            ),
    },
    {
        path: ROUTES_PATHS.FORM,
        exact: false,
        relatedMedia: [],
        module: () =>
            import(
                /* webpackChunkName: 'TestDriveForm' */ './pages/TestDriveForm/TestDriveForm'
            ).then((module) => ({ default: module.TestDriveForm })),
    },
];

export const App = () => {
    // todo refactoring,
    useLazyRoute(routes[0]);
    useLazyRoute(routes[1]);
    useLazyRoute(routes[2]);
    useLazyRoute(routes[3]);

    return (
        <React.Suspense fallback={<LoadSpinner />}>
            <Switch key="router">
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Switch>
        </React.Suspense>
    );
};
