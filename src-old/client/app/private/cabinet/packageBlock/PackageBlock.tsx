import * as React from 'react';
import { ListDevicesResponse } from '../../../../generated/proto.web';

import { Package } from './package/Package';

export interface IProps {
    devices : ListDevicesResponse.SuccessModel.DeviceModel[]
}

export const PackageBlock = ({devices} : IProps) => {

    const showActivePackage = (device : ListDevicesResponse.SuccessModel.DeviceModel, index : number) => {
        let empty : boolean;
        for (let i in device.currentPack) {
            if (device.currentPack.hasOwnProperty(i)) {
                empty = false
            }
            empty = true;
        } 
        if (empty) {
            return <Package key={index} device={device} />
        } else {
            return false
        }
    }

    return (
        <div className="PackageBlock">
            <div className="package__block-title">Активные пакеты</div>
            {devices.map((el, index : number) => (
                showActivePackage(el, index)
            ))}
        </div>
    )
}
