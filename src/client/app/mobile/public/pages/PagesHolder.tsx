import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { IndexPage } from './index/IndexPage';

export const PagesHolder = () => {

    return (
        <div className="PagesHolder">
            <IndexPage />
            {/* <Router>
                <Switch>
                    <Route exact path='/mobile/login'>
                        <div>Login</div>
                    </Route>
                    <Route exact path='mobile/registration'>
                        <div>registratiom</div>
                    </Route>
                    <Route exact path='/mobile'>
                        <IndexPage />
                    </Route>
                </Switch>
            </Router> */}
        </div>
    )
}
