import * as React from 'react';

import { ListDevicesResponse } from '../../../../../../../generated/proto.web';


export interface DeviceModel {
    device : ListDevicesResponse.SuccessModel.DeviceModel
}

export const Package = (props : DeviceModel) => {

    return (
        <div className="Package">
            <div className="left-block">
                <div className="whose">
                    <div>Устройство</div>
                    <input placeholder={props.device.name.value} type="text" className='whose-device'/>
                </div>
                
            </div>
        </div>
    )
}
