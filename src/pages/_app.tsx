import * as React from 'react';

import { Provider } from "react-redux";
import { STORE } from "../client/redux/StateApi";
import Router from 'next/router';
import Application from '../client/app/Application';
import NProgress from 'nprogress';
import { AuthProvider } from '../client/context/auth';
import PrivateRoute from '../client/context/PrivateRouter';

import "nprogress/nprogress.css";
import '../../node_modules/flag-icon-css/css/flag-icon.css';
import '../client/index.scss';
import '../client/resources/fonts.css';

interface AppModel {
    Component : any;
    pageProps : any;
}

// NProgress.configure({
//     speed: 800,
//     easing : 'ease',
//     showSpinner: false,
//     // minimum: 0.3,
// });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({Component, pageProps} : AppModel) => {

    const protectedRoutes = ['/cabinet', '/cabinet/chooseRates']

    return  ( 
        <Provider store={STORE}>
            <AuthProvider>  
                <PrivateRoute protectedRoutes={protectedRoutes}>
                    <Application>
                        <Component {...pageProps} />
                    </Application>
                </PrivateRoute>
            </AuthProvider>
        </Provider>
    )
}

export default App;

