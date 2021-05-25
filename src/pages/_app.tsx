import * as React from 'react';

import { Provider } from "react-redux";
import { STORE } from "../client/redux/StateApi";

import '../../node_modules/flag-icon-css/css/flag-icon.css';
import '../client/index.scss';
import '../client/resources/fonts.css';
import Application from '../client/app/Application';

interface AppModel {
    Component : any;
    pageProps : any;
}

const App = ({Component, pageProps} : AppModel) => (
    <Provider store={STORE}>
        <Application>
            <Component {...pageProps} />
        </Application>
    </Provider>
)

export default App;

