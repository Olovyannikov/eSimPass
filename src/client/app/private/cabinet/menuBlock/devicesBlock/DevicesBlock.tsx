import * as React from 'react';
import { Device } from './device/Device';

import addIcon from '../../../../../img/add.png';
import { ListDevicesResponse } from '../../../../../generated/proto.web';

export interface IProps {
    devices : ListDevicesResponse.SuccessModel.DeviceModel[]
}

export const  DevicesBlock = ({devices} : IProps) => {
    
    return (
        <div className="DevicesBlock">
            {devices && devices.map((el : ListDevicesResponse.SuccessModel.DeviceModel, index : number) => (
                <Device key={index} device={el} />
            ))}
            <div className="devices-block__addDevice">
                <div>
                    <img src={addIcon} alt="Add Icon" className='devices-block__img_add-icon'/>
                </div>
                <div className="devices-block__add-text">
                    Добавить устройство
                </div>
            </div>
        </div>
    )
}
