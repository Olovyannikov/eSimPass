import s from './Application.module.scss';

import * as React from 'react';
import {Header} from "./components/header/Header";
// import {Footer} from "./components/footer/Footer";

interface ApplicationModel {
    children?: React.ReactChild
}

export const Application = (props: ApplicationModel) => {
    return (
        <div className={s.Application}>
            <Header/>
            {props.children}
        </div>
    )
}
