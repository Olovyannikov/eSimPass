import * as React from 'react';
import { ListDevicesResponse } from '../../../../../../../../../../generated/proto.web';

import { WhoseDevice } from '../../../../../../../../components/whoseDevice/WhoseDevice';
import { img_iphone, img_redCross } from '../../../../../../../../../../resources/images';

interface DisabledDeviceModel {
    device : ListDevicesResponse.SuccessModel.DeviceModel
}

export const DisabledDevice = (props : DisabledDeviceModel) => {
    return (
        <div className="DisabledDevice">
            <div className="left-block">
                <WhoseDevice id={props.device.deviceId} name={props.device.name.value} />
                <div className="rate-info">
                    <div className="rate">
                        <div>eSIM</div>
                    </div>
                    <div className="device-info">
                        iPhone 11 Pro
                    </div>
                </div>
                <div className="dont-text">
                    Нет активного пакета
                </div>
            </div>
            <div className="right-block">
                <div className='cross'>   
                    <img className='cross-img' src={img_redCross} alt="icon-arrow"/>
                </div>
                <div className='iphone'>
                    <img className='iphone11' src={img_iphone} alt="Iphone"/>
                </div>
            </div>
        </div>
    )
}
