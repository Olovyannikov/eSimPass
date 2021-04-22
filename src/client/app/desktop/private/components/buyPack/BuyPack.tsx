import * as React from 'react';
import { useHistory } from 'react-router';

import { ListDevicesResponse } from '../../../../../generated/proto.web';
import { STATE_API } from '../../../../../redux/StateApi';

// import { convertDateUntilPackage } from '../../../../../utils';
import { Button } from '../buttons/Button';

export interface BuyRateModel {
    device : ListDevicesResponse.SuccessModel.DeviceModel
}

export const BuyPack = (props : BuyRateModel) => {

    const history = useHistory();

    const handleBuyPack = () => history.push('/cabinet/chooseRates')

    return (
        <div className="BuyPack">
            {/* TODO */}
            {/* <div className="until">Действует до <span className='date'>{convertDateUntilPackage(props.device.currentPack.activated.activated, props.device.currentPack.duration).toLocaleDateString()}</span></div> */}
            
            <Button func={handleBuyPack} className='button-buy' text='Купить пакет' />
            {/* TODO спроситть про отключение */}
            <div className="off-rate">Отключить интернет</div>
        </div>
    )
}
