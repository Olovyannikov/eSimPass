import * as React from 'react';
import { ListRatesResponse } from '../generated/proto.web';
import { STATE_API } from '../redux/StateApi';

import  DesktopApplication  from './desktop/DesktopApplication';
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
