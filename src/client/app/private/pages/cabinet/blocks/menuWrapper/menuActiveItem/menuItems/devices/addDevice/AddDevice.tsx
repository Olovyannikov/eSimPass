import * as React from 'react';

import { img_addIcon } from '../../../../../../../../../../resources/images';

export const AddDevice = () => {
    
    return (
        <div className="AddDevice">
            <div>
                <img src={img_addIcon} alt="Add Icon" className='img_add-icon'/>
            </div>
            <div className="add-text">
                Добавить устройство
            </div>
        </div>
    )
}
