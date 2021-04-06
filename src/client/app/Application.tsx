import * as React from 'react';

import { DesktopApplication } from './desktop/DesktopApplication';
import { MobileApplication } from './mobile/MobileApplication';

export const Application = () => {

    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

    const handleWindowWidth = () => setWindowWidth(width => width = window.innerWidth);
    
    React.useEffect(() => {
        
        window.addEventListener('resize',handleWindowWidth);

        return () => window.removeEventListener('resize', handleWindowWidth);
        
    }, [])

    const handleTypeApp = () => {
        
        if (windowWidth >= 420) {
            return <DesktopApplication />
        }
        else {
            return <MobileApplication />
        }
    }

    return (
        <div className="Application">
            {handleTypeApp()}
        </div>
    )

}
