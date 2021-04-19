/*
import * as React from 'react';

import { ListDevicesResponse } from '../../../../../../../../generated/proto.web';
import { ActivePackage } from './activePackage/ActivePackage';

export interface DevicesModel {
    packages: ListDevicesResponse.SuccessModel.DeviceModel[]
}

export const PackageList = (props : DevicesModel) => {

    return (
        <div className="PackageList">
            <div className="title-active">Активные пакеты</div>
                {props.packages.map((el, index : number) => (
                    <ActivePackage package={el} key={index} />
                ))}
        </div>
    )
}
*/