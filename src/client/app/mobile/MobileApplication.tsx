import * as React from 'react';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicApplication } from './public/PublicApplication';

export const MobileApplication = () => {

    return (
        <PublicApplication />
        // <Router>
        //     <Switch>
        //         <Route exact path='/'>
        //             <PublicApplication />
        //         </Route>
        //         <Route path='/registration'>
        //             <PublicApplication />
        //         </Route>
        //         <Route path='/connectEsim'>
        //             <PublicApplication />
        //         </Route>
        //         <Route path='*'>
        //             <PublicApplication />
        //         </Route>
        //     </Switch>
        // </Router>
    )
}

