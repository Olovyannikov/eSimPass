import * as React from 'react';
import { STATE_API } from 'redux/StateApi';

export const CheckButton = () => {

    return (
        <div onClick={() => STATE_API.showPublicWizard('checkDevice')} className="CheckButton">
            <div className="text">
                <span className='old-text'>Проверь!</span>
                {/* <span className='new-text'>eSIM и мое устройство совместимы?</span> */}
            </div>
        </div>
    )
}
