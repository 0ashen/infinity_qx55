import React from 'react';
import {
    Route,
    RouteComponentProps,
    Router,
    Switch,
    useLocation,
} from 'react-router-dom';
import { StaticContext } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { LoadSpinner } from './components/LoadSpinner/LoadSpinner';
import { useAnimRoute } from './hooks/useAnimRoute';
import { ReactLazyPreload } from './utils/reactLazyPreload';

const history = createHistory();

export enum ROUTES_PATHS {
    HOME_WELCOME = '/',
    NAVIGATION = '/navigation',
}

const Welcome = ReactLazyPreload(() =>
    import(/* webpackChunkName: 'Welcome' */ './pages/Welcome/Welcome').then(
        (module) => ({ default: module.Welcome }),
    ),
);
const Navigation = ReactLazyPreload(() =>
    import(
        /* webpackChunkName: 'Navigation' */ './pages/Navigation/Navigation'
    ).then((module) => ({ default: module.Navigation })),
);

export type routeType = {
    path: ROUTES_PATHS;
    exact: boolean;
    component?: React.LazyExoticComponent<
        React.VoidFunctionComponent<
            RouteComponentProps<any, StaticContext, any>
        >
    >;
};

export const routes: routeType[] = [
    { path: ROUTES_PATHS.HOME_WELCOME, exact: true },
    { path: ROUTES_PATHS.NAVIGATION, exact: true },
];

export const App = () => {
    const asdf = useLocation();
    console.log(asdf);
    const [DeferredWelcome, hasImportFinishedWelcome, enableComponentWelcome] =
        useAnimRoute(Welcome);
    routes[0].component = DeferredWelcome;

    const [
        DeferredNavigation,
        hasImportFinishedNavigation,
        enableComponentNavigation,
    ] = useAnimRoute(Navigation);
    routes[1].component = DeferredNavigation;

    const currentLoadSet = {
        hasImportFinished:
            hasImportFinishedWelcome && hasImportFinishedNavigation,
        enableComponent: (() => {
            if (hasImportFinishedWelcome) return enableComponentWelcome;
            return enableComponentNavigation;
        })(),
    };
    return (
        <Router history={history}>
            <React.Suspense fallback={<LoadSpinner {...currentLoadSet} />}>
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
        </Router>
    );
};
