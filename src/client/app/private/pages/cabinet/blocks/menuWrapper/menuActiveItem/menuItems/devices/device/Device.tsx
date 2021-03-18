import * as React from 'react';

import { ListDevicesResponse } from '../../../../../../../../../../generated/proto.web';
import { img_iphone, img_redCross } from '../../../../../../../../../../resources/images';
import { convertDateUntilPackage } from '../../../../../../../../../../utils';
import { ProgressBar } from '../../../../../../../../components/progressBar/ProgressBar';
import { WhoseDevice } from '../../../../../../../../components/whoseDevice/WhoseDevice';

interface DeviceModel {
    device : ListDevicesResponse.SuccessModel.DeviceModel
}

export const Device = (props : DeviceModel) => {
    
    return (
        <div className="Device">
            <div className="left-block">
                <WhoseDevice id={props.device.deviceId} name={props.device.name.value} />
                <div className="rate-info">
                    <div className="rate">
                        <div>eSIM {props.device.currentPack.rate.operatorName}</div>
                    </div>
                    <div className="device-info">
                        iPhone 11 Pro
                    </div>
                </div>
                <div className="price">
                    Стоимость {props.device.currentPack.price} €
                </div>
                <ProgressBar quota={props.device.currentPack.quota} used={props.device.currentPack.used} />
                <div className="until">Действует до <span className='date'>{convertDateUntilPackage(props.device.currentPack.boughtDate, props.device.currentPack.duration).toLocaleDateString()}</span></div>
            </div>
            <div className="right-block">
                <div className='active-arrow'>   
                    <img className='active-arrow' src={img_redCross} alt="icon-arrow"/>
                </div>
                <div className='iphone'>
                    <img className='iphone11' src={img_iphone} alt="Iphone"/>
                </div>
            </div>
        </div>
    )
}
