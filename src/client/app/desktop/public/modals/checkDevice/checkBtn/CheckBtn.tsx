import * as React from 'react';

interface CheckBtnModel {
    disabled? : boolean;
}

export const CheckBtn = (props : CheckBtnModel) => {

    return (
        <div className={`CheckBtn ${props.disabled ? 'disabled' : ''}`}>
            <div className="text-btn">Проверить</div>
        </div>
    )
}
