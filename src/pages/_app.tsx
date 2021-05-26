import * as React from 'react';

import { Provider } from "react-redux";
import { STORE } from "../client/redux/StateApi";
import Router from 'next/router';
import Application from '../client/app/Application';
import NProgress from 'nprogress';

import '../../node_modules/flag-icon-css/css/flag-icon.css';
import '../client/index.scss';
import '../client/resources/fonts.css';
import "nprogress/nprogress.css";

interface AppModel {
    Component : any;
    pageProps : any;
}
NProgress.configure({
    speed: 800,
    easing : 'ease',
    showSpinner: false,
    minimum: 0.3,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({Component, pageProps} : AppModel) => (
    <Provider store={STORE}>
        <Application>
            <Component {...pageProps} />
        </Application>
    </Provider>
)

export default App;

