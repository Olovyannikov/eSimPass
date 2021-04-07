import * as React from 'react';
import { ConnectEsim } from './connectEsim/ConnectEsim';

import { IndexPage } from './index/IndexPage';
import { Login } from './login/Login';
import { Registration } from './registration/Registration';
import { RestorePassword } from './restorePassword/RestorePassword';

export const PagesHolder = () => {

    const renderPage = () => {
        
        if (window.location.pathname === '/registration') {
            return <Registration />
        }
        else if (window.location.pathname === '/connectEsim') {
            return <ConnectEsim />
        }
        else if (window.location.pathname === '/login') {
            return <Login />
        }
        else if (window.location.pathname === '/restorePassword') {
            return <RestorePassword />
        }
        else {
            return <IndexPage />
        }
    }

    return (
        <div className="PagesHolder">
            {renderPage()}
        </div>
    )
}
