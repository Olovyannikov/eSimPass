import * as React from 'react';

interface WhoseDeviceModel {
    name : string;
}

export const WhoseDevice = (props : WhoseDeviceModel) => {
    return (
        <div className="WhoseDevice">
            <div>Устройство</div>
            <input placeholder={props.name} type="text" className='whose-device'/>
        </div>
    )
}
