import * as React from 'react';

import { Provider } from "react-redux";
import { STORE } from "../client/redux/StateApi";
import Router from 'next/router';
import Application from '../client/app/Application';
import NProgress from 'nprogress';
import PrivateRoute from '../client/context/PrivateRouter';

import "nprogress/nprogress.css";
import '../../node_modules/flag-icon-css/css/flag-icon.css';
import '../client/resources/styles/style.scss';

interface AppModel {
    Component : any;
    pageProps : any;
}

const App = ({Component, pageProps} : AppModel) => {
    
    React.useEffect(() => {
        Router.events.on('routeChangeStart', () => NProgress.start());
        Router.events.on('routeChangeComplete', () => NProgress.done());
        Router.events.on('routeChangeError', () => NProgress.done());

        return () => {
            Router.events.off('routeChangeStart', () => NProgress.start());
            Router.events.off('routeChangeComplete', () => NProgress.done());
            Router.events.off('routeChangeError', () => NProgress.done());
        }

    }, [])

    const protectedRoutes = ['/cabinet', '/cabinet/chooseRates']

    return ( 
        <Provider store={STORE}>
            <PrivateRoute protectedRoutes={protectedRoutes}>
                <Application>
                    <Component {...pageProps} />
                </Application>
            </PrivateRoute>
        </Provider>
    )
}

export default App;

