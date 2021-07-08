import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GlobalStyleCommon } from './styles/common';
import {theme} from "./styles/styled-component-theme";

ReactDOM.render(
  <React.StrictMode>
      <GlobalStyleCommon />
      <ThemeProvider theme={theme}>
             <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
