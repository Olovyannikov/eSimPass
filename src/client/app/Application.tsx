import * as React from 'react';

import { MobileApplication } from './mobile/MobileApplication';
import {Header} from "./components/header/Header";
import {PagesHolder} from "./application/public/PagesHolder/PagesHolder";
import {PublicApplication} from "./application/public/PublicApplication";


interface ApplicationModel {
    children? : React.ReactChild
}

const Application = (props : ApplicationModel) => {

    return (
        <div className='Application'>
            {/*<div className="Desktop">*/}
            {/*    {props.children}*/}
            {/*</div>*/}
            {/*<div className="Mobile">*/}
            {/*    <MobileApplication />*/}
            {/*</div>*/}
            <PublicApplication/>
        </div>
    )

}
export default Application
