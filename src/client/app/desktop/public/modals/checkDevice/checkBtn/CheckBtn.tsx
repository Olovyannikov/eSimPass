import * as React from 'react';

interface CheckBtnModel {
    disabled? : boolean;
    onClick : Function;
}

export const CheckBtn = (props : CheckBtnModel) => {

    return (
        <div onClick={() => props.onClick()} className={`CheckBtn ${props.disabled ? 'disabled' : ''}`}>
            <div className="text-btn">Проверить</div>
        </div>
    )
}
