import * as React from 'react';

import { IProps } from '../../../private/cabinet/menuBlock/devicesBlock/device/Device';
import { ActivePackage } from './activePackage/ActivePackage';
import { SpentPackage } from './spentPackage/SpentPackage';

export const PackageBlockDevice = ({device} : IProps) => {

    return (
        <div className="PackageBlockDevice">
            <ActivePackage currentPack={device.currentPack}/>
            {device.packs.length > 0 ? <div className="title">Израсходованные пакеты</div> : <></>}
            {device.packs && device.packs.map((el, index : number) => (
                <SpentPackage key={index} pack={el} />
            ))}
        </div>
    )
}
