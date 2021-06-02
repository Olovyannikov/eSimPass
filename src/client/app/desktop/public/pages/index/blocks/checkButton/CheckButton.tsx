import * as React from 'react';
import { STATE_API } from 'redux/StateApi';

export const CheckButton = () => {

    return (
        <div onClick={() => STATE_API.showPublicWizard('checkDevice')} className="CheckButton">
            <div className="text">
                <span>Проверь!</span>
            </div>
        </div>
    )
}
