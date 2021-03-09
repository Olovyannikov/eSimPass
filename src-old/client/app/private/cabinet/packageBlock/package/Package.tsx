import * as React from 'react';
import { ListDevicesResponse } from '../../../../../generated/proto.web';

import { BuyRate } from '../../../../components/buyRate/BuyRate';
import { ProgressBar } from '../../../../components/progressBar/ProgressBar';
import { WhoseDevice } from '../../../../components/whoseDevice/WhoseDevice';
 
export interface IProps {
    device : ListDevicesResponse.SuccessModel.DeviceModel
}

export const Package = ({device} : IProps) => {

    return (
        <div className="Package">
            <div className="package__left-block">
                <WhoseDevice name={device.name.value} />
                <ProgressBar className='small-bar' currentPack={device.currentPack} />
            </div>
            <div className="package__price-block">
                <div className="package__price-text">Стоимость</div>
                <div className="package__price-amount">{device.currentPack.price}<span>€</span> </div>
            </div>
            <BuyRate boughtDate={device.currentPack.boughtDate} duration={device.currentPack.duration} />
        </div>
    )
}
