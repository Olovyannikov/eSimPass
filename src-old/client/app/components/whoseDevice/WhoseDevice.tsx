import * as React from 'react';

export interface IWhoseDevice {
    name : string
}

export const WhoseDevice = ({name} : IWhoseDevice) => {
    return (
        <div className="whose-device__who">
            <div>Устройство</div>
            <input placeholder={name} type="text" className='whose-device__device'/>
        </div>
    )
}
