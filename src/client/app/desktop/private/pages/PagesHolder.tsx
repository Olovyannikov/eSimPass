import * as React from 'react';
import { Cabinet } from './cabinet/Cabinet';
import { Chooser } from './chooser/Chooser';

export const PagesHolder = () => {

    // const location = useLocation();

    const renderActivePage = () => {

        if (typeof window !== 'undefined') {
            
            if (window.location.pathname === '/cabinet') {
                return <Cabinet />
            }
            else if (window.location.pathname === '/cabinet/chooseRates') {
                return <Chooser />
            }
        }
    }

    return (
        <div className="PagesHolder">
            {renderActivePage()}
        </div>
    )
}

