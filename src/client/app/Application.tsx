import * as React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { State } from '../redux/State';
import { STORAGE } from '../StorageAdapter';
import { PublicApplication } from './public/PublicApplication';
import { PrivateApplication } from "./private/PrivateApplication";

const ApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {

    const checkAuthenticatedUser = () => {
        if (STORAGE.getToken()) {
            return <PrivateApplication />
        }
        else {
            return <Redirect to='/' />
        }
    }

    //https://toesim-dev.stand.gmdp.io/deeplink/payment/success?paymentId=1615543967968X10094

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <PublicApplication  />
                </Route>
                <Route exact path='/verifyRegistrationEmail/:token'>
                    <PublicApplication />
                </Route>
                <Route exact path='/cabinet'>
                    {() => checkAuthenticatedUser() }
                </Route>
                <Route path='/deeplink/payment/success'>
                    {() => checkAuthenticatedUser()}
                </Route>
                <Route path='*' exact>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Router>
    )
}

const mapStateToProps = (state : State) => ({
    authenticated : state.auth != null,
})

export const Application = connect(mapStateToProps)(ApplicationImpl);
