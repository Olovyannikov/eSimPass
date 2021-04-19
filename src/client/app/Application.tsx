import * as React from 'react';

import { DesktopApplication } from './desktop/DesktopApplication';
// import { MobileApplication } from './mobile/MobileApplication';

export const Application = () => {

    return (
        <div className='Application'>
            <div className="Desktop">
                <DesktopApplication />
            </div>
            {/* <div className="Mobile">
                <MobileApplication />
            </div> */}
        </div>
    )

}
