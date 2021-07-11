import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export enum ROUTES_PATH {
    HOME_WELCOME = '/',
    NAVIGATION = '/navigation',
}

const ReactLazyPreload = (importStatement: () => Promise<any>) => {
    const Component = React.lazy(importStatement);
    // @ts-ignore
    Component.preload = importStatement;
    return Component;
};

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

export const App = () => (
    <Router history={history}>
        <React.Suspense fallback={'Loading'}>
            <Switch key="router">
                <Route exact path={ROUTES_PATH.HOME_WELCOME} component={Welcome} />
                <Route exact path={ROUTES_PATH.NAVIGATION} component={Navigation} />
            </Switch>
        </React.Suspense>
    </Router>
);
