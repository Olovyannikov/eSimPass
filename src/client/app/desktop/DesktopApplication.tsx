import * as React from 'react';

import { STORAGE } from '../../StorageAdapter';
import { PublicApplication } from './public/PublicApplication';
import { PrivateApplication } from "./private/PrivateApplication";

import Router from 'next/router';


const DesktopApplication = () => {

    const checkAuthenticatedUser = () => {
        if (STORAGE.getToken() && Router.pathname === '/cabinet') {
            return <PrivateApplication />
        }
        else if (STORAGE.getToken()) {
            return <PublicApplication />
        }
        else {
            return <PublicApplication />
        }
    }


    return (
        // <PublicApplication />
        checkAuthenticatedUser()
            // checkAuthenticatedUser()
        // <Router>
        //     <Switch>
        //         <Route exact path='/'>
        //             <PublicApplication />
        //         </Route>
        //         <Route exact path='/verifyRegistrationEmail/:tokenVerify'>
        //             <PublicApplication />
        //         </Route>
        //         <Route exact path='/restorePassword/:tokenRestore'>
        //             <PublicApplication />
        //         </Route>
        //         <Route exact path='/cabinet'>
        //             {() => checkAuthenticatedUser() }
        //         </Route>
        //         <Route exact path='/deeplink/payment/success'>
        //             {() => checkAuthenticatedUser()}
        //         </Route>
        //         <Route exact path='/cabinet/chooseRates'>
        //             {() => checkAuthenticatedUser()}
        //         </Route>
        //         <Route path='*'>
        //             <Redirect to='/' />
        //         </Route>
        //     </Switch>
        // </Router>
    )
}

export default DesktopApplication
