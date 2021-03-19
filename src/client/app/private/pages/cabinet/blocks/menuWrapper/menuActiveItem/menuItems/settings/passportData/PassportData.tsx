import * as React from 'react';

import { img_passport, img_arrowDown } from '../../../../../../../../../../resources/images';

export const PassportData = () => {
    return (
        <div className="PassportData">
            <div className="passport-block">
                <div className='passport'><img src={img_passport} alt="Passport"/></div>
                <div>Паспортные данные</div>
            </div>
            <img src={img_arrowDown} alt="Arrow" className="arrow"/>
        </div>
    )
}
