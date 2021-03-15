import * as React from 'react';

import { ListDevicesResponse } from '../../../../../../generated/proto.web';
import { Package } from './package/Package';

export interface DevicesModel {
    devices? : ListDevicesResponse.SuccessModel.DeviceModel[]
}

export const Packages = (props : DevicesModel) => {

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

    const hasPackage = () => {
        if (props.devices) {
            return <div className="title">Активные пакеты</div>
        }
        else {
            return (
                <>
                    <div className="title">Нет активных пакетов</div>
                    <div className="dont-have-package">
                        <div className="buy-package">
                            Купить пакет
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="Packages">
            {hasPackage()}
            {props.devices && props.devices.map((el, index : number) => (
                showActivePackage(el, index)
            ))}
        </div>
    )
}
