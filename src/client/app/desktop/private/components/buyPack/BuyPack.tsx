import * as React from 'react';

import { ListDevicesResponse } from '../../../../../generated/proto.web';
import { STATE_API } from '../../../../../redux/StateApi';

import { convertDateUntilPackage } from '../../../../../utils';
import { Button } from '../buttons/Button';

export interface BuyRateModel {
    package : ListDevicesResponse.SuccessModel.DeviceModel
}

export const BuyPack = (props : BuyRateModel) => {

    const handleBuyPack = () => STATE_API.buyPack({ device : props.package })

    return (
        <div className="BuyPack">
            <div className="until">Действует до <span className='date'>{convertDateUntilPackage(props.package.currentPack.boughtDate, props.package.currentPack.duration).toLocaleDateString()}</span></div>
            <Button func={handleBuyPack} className='button-buy' text='Купить пакет' />
            <div className="off-rate">Отключить интернет</div>
        </div>
    )
}
