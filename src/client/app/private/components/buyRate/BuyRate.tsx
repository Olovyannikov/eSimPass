import * as React from 'react';

import { ListDevicesResponse } from '../../../../generated/proto.web';

import { convertDateUntilPackage } from '../../../../utils';
import { Button } from '../buttons/Button';

export interface BuyRateModel {
    package : ListDevicesResponse.SuccessModel.DeviceModel
}

export const BuyRate = (props : BuyRateModel) => {

    return (
        <div className="BuyRate">
            <div className="until">Действует до <span className='date'>{convertDateUntilPackage(props.package.currentPack.boughtDate, props.package.currentPack.duration).toLocaleDateString()}</span></div>
            <Button className='button-buy' text='Купить пакет' />
            <div className="off-rate">Отключить интернет</div>
        </div>
    )
}
