/*
import * as React from 'react';

import { ListDevicesResponse } from '../../../../../../../../../generated/proto.web';
import { BuyPack } from '../../../../../../components/buyPack/BuyPack';
import { ProgressBar } from '../../../../../../components/progressBar/ProgressBar';
import { WhoseDevice } from '../../../../../../components/whoseDevice/WhoseDevice';


export interface DeviceModel {
    package : ListDevicesResponse.SuccessModel.DeviceModel
}

export const ActivePackage = (props : DeviceModel) => {

    return (
        <div className="ActivePackage">
            <div className="left-block">
                <WhoseDevice id={props.package.deviceId} name={props.package.name?.value} />
                <div className="progress-block">
                    <div className="info-rate">
                        <div className='country'>{props.package.currentPack.rate?.countryName}</div>
                        <div className="rate-info">{props.package.currentPack.rate?.operatorName}</div>
                    </div>
                    <ProgressBar quota={props.package.currentPack.quota} used={props.package.currentPack.used} />
                </div>
            </div>
            <div className="price-block">
                <div className="text">Стоимость</div>
                <div className="amount">{props.package.currentPack.price}<span>₽</span> </div>
            </div>
            <BuyPack device={props.package} />
        </div>
    )
}
*/