import * as React from 'react';

import { MobileApplication } from './mobile/MobileApplication';

interface ApplicationModel {
    children? : React.ReactChild
}

const Application = (props : ApplicationModel) => {
    
    return (
        <div className='Application'>
            <div className="Desktop">
                {props.children}
            </div>
            <div className="Mobile">
                <MobileApplication />
            </div>
        </div>
    )

}
export default Application
