import * as React from 'react';

interface OptionModel {
    text : string;
    onClick : Function
}

export const Option = (props : OptionModel) => {

    return (
        <div onClick={() => props.onClick(props.text)} className="Option">
            <div>{props.text}</div>
        </div>
    )
}
