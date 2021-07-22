import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import reportWebVitals from './reportWebVitals';
import { GlobalStyleCommon } from './styles/common';
import { theme } from './styles/styled-component-theme';
import { App } from './App';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import { Cursor } from './components/Cursor/Cursor';
import { isMobile } from 'react-device-detect';
import ReactNotification from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const history = createHistory();

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyleCommon />
        <ThemeProvider theme={theme}>
            <Router history={history}>
                {(!process.env.NODE_ENV ||
                    process.env.NODE_ENV !== 'development') &&
                    !isMobile && <Cursor />}
                <ReactNotification />
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
