import * as React from 'react';

import phone from '../../../img/iphone-11.png';
import greenDot from '../../../img/green-dot.png';

import { Button } from '../../components/buttons/Button';
import { IProps } from '../../private/cabinet/menuBlock/devicesBlock/device/Device';
import { PackageBlockDevice } from './packageBlockDevice/PackageBlockDevice';

export const DeviceDetail = ({device} : IProps) => {

    return (
        <div className="DeviceDetail">
            <div className="wrap">
                <div className="device-name">iPhone 11 Pro</div>
                <div className="device-action">
                    <div className='img-action'>
                        <img className="device-img" src={phone} alt="iPhone 11"/>
                    </div>
                    <div className="device-right-action">
                        <div className="whose-text">
                            {device.name.value}
                            <img src={greenDot} className='status' alt=""/>
                        </div>
                        <div className="buttons-action">
                            <Button className='buy' text='Купить пакет' />
                            <Button className='delete' text='Удалить устройство' />
                        </div>
                    </div>
                </div>
                <PackageBlockDevice device={device} />
            </div>
        </div>
    )
}
