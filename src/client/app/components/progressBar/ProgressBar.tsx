import * as React from 'react';
import { percentOfPackage, setColorBar } from '../../../codebase/utils';
import { ListDevicesResponse } from '../../../generated/proto.web';
import { AmountRate } from '../amountRate/AmountRate';
import { PackageInfoRate } from '../packageInfoRate/PackageInfoRate';

interface IProps {
    currentPack: ListDevicesResponse.SuccessModel.DeviceModel.PackModel;
    className? : string;
}

export const ProgressBar = ({currentPack, className} : IProps) => {

    return (
        <div className='BlockBar'>
            <PackageInfoRate rate={currentPack.rate} />
            <div className={`progressBar ${className}`}>
                <div className='bar' style={{width:`${percentOfPackage(Number(currentPack.quota), Number(currentPack.used))}%`, backgroundColor: setColorBar(percentOfPackage(Number(currentPack.quota), Number(currentPack.used)))}}></div>
            </div>
            <AmountRate quota={currentPack.quota} used={currentPack.used} />
        </div>
    )
}
