import * as React from 'react';

import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
// import Application  from '../../client/app/Application';
import Router from 'next/router';


export default () => {

    const handleRoutindPage = () => {
        if (typeof window !== 'undefined') {
            if (Router.pathname === '/cabinet') {
                return (

                    <PrivateApplication />
                )
            }
        }
    }


    return (
        <div className="Application">
            <div className="Desktop">
                {handleRoutindPage()}
            </div>
        </div>
    )

}
// https://toesim-dev.stand.gmdp.io/restorePassword/9c709481-d017-4c7d-aa2f-d1dbe79ca00a

