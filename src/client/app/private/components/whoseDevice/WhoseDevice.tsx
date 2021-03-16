import * as React from 'react';

interface WhoseDeviceModel {
    name : string;
    id : string;
}

export const WhoseDevice = (props : WhoseDeviceModel) => {

    const inputRef = React.useRef<HTMLInputElement>();
    
    return (
        <div className="WhoseDevice">
            <div>Устройство</div>
            <input ref={inputRef} placeholder={props.name} type="text" className='whose-device'/>
        </div>
    )
}
