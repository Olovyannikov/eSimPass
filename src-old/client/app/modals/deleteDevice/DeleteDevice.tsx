import * as React from 'react';
import { closeModal } from './../../../codebase/utils';
import { STATE_API } from '../../../redux/StateApi';
import { Button } from '../../components/buttons/Button';

interface IDeleteDevice {
    deviceId? : string;
    deviceName? : string;
}

export const DeleteDevice = ({deviceId, deviceName} : IDeleteDevice) => {

    return (
        <div className="DeleteDevice">
            <div className="delete-device__title">Вы действительно хотите удалить устройство {deviceName}</div>
            <Button func={() => closeModal(deviceId)} text='Да' className='delete' />
            <Button func={() => closeModal()} text='Нет' className='dont-delete' />
        </div>
    )
}
