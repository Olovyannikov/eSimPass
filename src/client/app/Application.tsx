import * as React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { State } from '../redux/State';

import { PublicApplication } from './public/PublicApplication';

const ApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {
    
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <PublicApplication />
                </Route>
            </Switch>
        </Router>
    )
}

const mapStateToProps = (state : State) => ({
    authenticated : state.auth != null,
})

export const Application = connect(mapStateToProps)(ApplicationImpl)
