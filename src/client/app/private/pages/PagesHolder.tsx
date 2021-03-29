import * as React from 'react';
import { Cabinet } from './cabinet/Cabinet';
import { Chooser } from './chooser/Chooser';
import { useLocation } from 'react-router-dom'

export const PagesHolder = () => {


    const location = useLocation()

    // React.useEffect(() => {
    //     if (location.pathname === '/cabinet') {
    //         return <Cabinet />
    //     }
        
    // }, [location])

    const renderActivePage = () => {
        console.log(location.pathname);
        
        if (location.pathname === '/cabinet') {
            return <Cabinet />
        }
        else if (location.pathname === '/cabinet/chooseRates') {
            return <Chooser />
        }
    }

    return (
        <div className="PagesHolder">
            {/* <Cabinet /> */}
            {/* <Chooser /> */}
            {renderActivePage()}
        </div>
    )
}
