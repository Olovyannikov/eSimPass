import * as React from 'react';

import { img_arrowDown } from 'resources/images';

interface SelectProps {
    disabled? : boolean;
    text : string;

}

export const Select = (props : SelectProps) => {

    return (
        <div className={`Select ${props.disabled ? 'disabled' : ''}`}>
            <div className="device-type">{props.text}</div>
            <img className='arrow-down' src={img_arrowDown} alt="Down" />
        </div>
    )
}
