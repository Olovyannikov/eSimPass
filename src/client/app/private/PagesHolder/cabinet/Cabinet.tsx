import s from './Cabinet.module.scss';
import {Header} from "./components/header/Header";
import * as React from "react";
import {Index} from "./index/Index";

export const Cabinet = () => {
    return (
        <div className={s.Cabinet}>
            <Header/>
            <Index/>
        </div>
    )
}
