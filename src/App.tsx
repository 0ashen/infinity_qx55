import React, { VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoadSpinner } from './components/LoadSpinner/LoadSpinner';
import { lazyComponent, useLazyRoute } from './hooks/useLazyRoute';
import { getImagePromise } from './utils/getImagePromise';
import { ScrollToTopEveryTransition } from './components/ScrollToTopEveryTransition';
import { getVideoPromise } from './utils/getVideoPromise';

export enum ROUTES_PATHS {
    HOME_WELCOME = '/',
    NAVIGATION = '/navigation',
    UPS = '/ups/',
    TEST_DRIVE_FORM = '/test-drive-form',
    BOOKING_FORM = '/booking-form',
    SUBSCRIBE_TO_NEWS_FORM = '/subscribe-to-news-form',
    MULTIMEDIA = '/multimedia',
    PRESENTATION = '/presentation',
}

export type routeType = {
    path: ROUTES_PATHS | string;
    exact: boolean;
    component?: lazyComponent;
    hasImportFinished?: boolean;
    enableComponent?: () => void;
    relatedMedia: (() => Promise<any>)[];
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
            getImagePromise('/images/navigation/usp1.jpg'),
            getImagePromise('/images/navigation/usp2.jpg'),
            getImagePromise('/images/navigation/usp3.jpg'),
            getImagePromise('/images/navigation/usp4.jpg'),
            getImagePromise('/images/navigation/usp5.jpg'),
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
        path: ROUTES_PATHS.TEST_DRIVE_FORM,
        exact: false,
        relatedMedia: [
            getImagePromise(
                require('./media/images/form-background.jpg').default,
            ),
        ],
        module: () =>
            import(
                /* webpackChunkName: 'TestDriveForm' */ './pages/TestDriveForm/TestDriveForm'
            ).then((module) => ({ default: module.TestDriveForm })),
    },
    {
        path: ROUTES_PATHS.BOOKING_FORM,
        exact: false,
        relatedMedia: [
            getImagePromise(
                require('./media/images/form-background.jpg').default,
            ),
        ],
        module: () =>
            import(
                /* webpackChunkName: 'BookingForm' */ './pages/BookingForm/BookingForm'
            ).then((module) => ({ default: module.BookingForm })),
    },
    {
        path: ROUTES_PATHS.SUBSCRIBE_TO_NEWS_FORM,
        exact: false,
        relatedMedia: [
            getImagePromise(
                require('./media/images/form-background.jpg').default,
            ),
        ],
        module: () =>
            import(
                /* webpackChunkName: 'SubscribeToNewsForm' */ './pages/SubscribeToNewsForm/SubscribeToNewsForm'
            ).then((module) => ({ default: module.SubscribeToNewsForm })),
    },
    {
        path: ROUTES_PATHS.MULTIMEDIA,
        exact: false,
        relatedMedia: [
            getImagePromise(
                require('./media/images/ups-background.jpg').default,
            ),
        ],
        module: () =>
            import(
                /* webpackChunkName: 'Multimedia' */ './pages/Multimedia/Multimedia'
            ).then((module) => ({ default: module.Multimedia })),
    },
    {
        path: ROUTES_PATHS.PRESENTATION,
        exact: false,
        relatedMedia: [getVideoPromise('/videos/closed-show.mp4')],
        module: () =>
            import(
                /* webpackChunkName: 'ClosedShow' */ './pages/ClosedShow/ClosedShow'
            ).then((module) => ({ default: module.ClosedShow })),
    },
];

export const App = () => {
    // todo refactoring,
    useLazyRoute(routes[0]);
    useLazyRoute(routes[1]);
    useLazyRoute(routes[2]);
    useLazyRoute(routes[3]);
    useLazyRoute(routes[4]);
    useLazyRoute(routes[5]);
    useLazyRoute(routes[6]);
    useLazyRoute(routes[7]);

    return (
        <React.Suspense fallback={<LoadSpinner />}>
            <ScrollToTopEveryTransition />
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
