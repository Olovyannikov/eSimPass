import * as React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { PublicApplication } from './public/PublicApplication';
import { Cabinet } from './private/cabinet/Cabinet';
import { State } from "./../redux/State";
import { Modals } from './modals/Modals';

const ApplicationImpl = ({auth, modal} : ReturnType<typeof mapStateToProps>) => {

    const checkAuth = () => {
        if (auth.login) {
            return <Cabinet />
        } else {
            return <Redirect to='/' />
        }
    }

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <PublicApplication />
                </Route>
                <Route exact path='/cabinet'>
                    {/* {checkAuth()} */}
                    <Cabinet />
                </Route>
            </Switch>
            <Modals />
        </Router>
    )
}

const mapStateToProps = (state : State) => ({
    auth : state.auth,
    modal : state.modal,
})

export const Application = connect(mapStateToProps)(ApplicationImpl)
