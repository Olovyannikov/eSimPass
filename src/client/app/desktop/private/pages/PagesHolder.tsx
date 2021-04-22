import * as React from 'react';
import { Cabinet } from './cabinet/Cabinet';
import { Chooser } from './chooser/Chooser';
import { useLocation, useRouteMatch } from 'react-router-dom'

export const PagesHolder = () => {

    const location = useLocation();

    const renderActivePage = () => {
        
        if (location.pathname === '/cabinet') {
            return <Cabinet />
        }
        else if (location.pathname === '/cabinet/chooseRates') {
            return <Chooser />
        }
    }

    return (
        <div className="PagesHolder">
            {renderActivePage()}
        </div>
    )
}
