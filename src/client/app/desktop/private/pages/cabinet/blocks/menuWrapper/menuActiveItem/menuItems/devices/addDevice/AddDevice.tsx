import * as React from 'react';
import { CONNECTION } from '../../../../../../../../../../../Connection';
import { STATE_API } from '../../../../../../../../../../../redux/StateApi';

import { img_addIcon } from '../../../../../../../../../../../resources/images';

export const AddDevice = () => {

    const handleAddDevice = () => STATE_API.showPrivateWizard('addDevice');
    
    return (
        <div className="AddDevice">
            <div onClick={handleAddDevice}>
                <img src={img_addIcon} alt="Add Icon" className='img_add-icon'/>
            </div>
            <div className="add-text">
                Добавить устройство
            </div>
        </div>
    )
}

