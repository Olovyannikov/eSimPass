import * as React from 'react';

import { PassportWrapper } from './passportWrapper/PassportWrapper';
import { img_passport, img_arrowDown } from '../../../../../../../../../../../resources/images';

export const PassportDropDown = () => {

    const [dropDown, setDropDown] = React.useState<boolean>(false);

    const toggleDropDown = () => setDropDown(prev => !prev);
    
    const setStyleForDropDown = () => dropDown ? 'show' : 'hidden';

    return (
        <div className={`PassportDropDown ${setStyleForDropDown()}`}>
            <div className="passport-text">
                <div className='passport-img'><img src={img_passport} alt="Passport"/></div>
                <div>Паспортные данные</div>
            </div>
            <img onClick={toggleDropDown} src={img_arrowDown} alt="Arrow" className={`arrow ${setStyleForDropDown()}`}/>
            <PassportWrapper show={dropDown} />
        </div>
    )
}
