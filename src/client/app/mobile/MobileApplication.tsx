import * as React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PublicApplication } from './public/PublicApplication';

export const MobileApplication = () => {

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <PublicApplication />
                </Route>
                <Route path='*' exact>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Router>
    )
}
