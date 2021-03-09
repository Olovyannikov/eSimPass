import * as React from 'react';

import arrowDown from '../../../../img/arrow-down.png';
import passport from '../../../../img/passport.png';

export const DropDown = () => {

    return (
        <div className='DropDown'>
            <div className="drop-down__passport-data">
                <div className='drop-down__passport'><img src={passport} alt="Passport"/></div>
                <div>Паспортные данные</div>
            </div>
            <img src={arrowDown} alt="Arrow" className="drop-down__arrow"/>
        </div>
    )
}
