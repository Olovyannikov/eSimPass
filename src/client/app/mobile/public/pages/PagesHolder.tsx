import * as React from 'react';
import { ConnectEsim } from './connectEsim/ConnectEsim';

import { IndexPage } from './index/IndexPage';
import { Registration } from './registration/Registration';

export const PagesHolder = () => {

    // try to use useLocation

    const renderPage = () => {
        
        if (window.location.pathname === '/registration') {
            return <Registration />
        }
        else if (window.location.pathname === '/connectEsim') {
            return <ConnectEsim />
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

