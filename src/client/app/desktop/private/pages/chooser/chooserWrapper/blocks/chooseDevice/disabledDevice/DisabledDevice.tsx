import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import { CONNECTION } from '../../../../../../../../../Connection';

import { ListDevicesResponse, ListRatesResponse, BuyPackRequest, BuyPackResponse } from '../../../../../../../../../generated/proto.web';
import { STATE_API } from '../../../../../../../../../redux/StateApi';
import { img_iphone } from '../../../../../../../../../resources/images';
import { waitForClose } from '../../../../../../../../../utils';

interface DisabledDeviceModel {
    device : ListDevicesResponse.SuccessModel.DeviceModel;
    pack? : ListRatesResponse.SuccessModel.RateModel.PackModel;
    rateId? : string;
}

export const DisabledDevice = (props : DisabledDeviceModel) => {

    const logger = new Logger('Buy Pack Disable Device');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [response, setResponse] = React.useState<string>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    const handleBuyPack = () => {

        CONNECTION.buyPack(createBuyPackRequest ())
            .do(parseBuyPackResponse)
            // .delay(2000)
            // .do(() => STATE_API.hideAuthWizard())
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))
        
    }

    const parseBuyPackResponse = (response : BuyPackResponse) => {
        if (response.success) {
            setSuccess(prev => prev = true)
        }
        else if (response.packNotFound || response.rateNotFound) {
            setResponse(prev => prev = 'Пакет не найден')
        }
        else if (response.notEnoughFunds) {
            setResponse(prev => prev = 'Недостаточно средств')
        }
        else if (response.deviceNotFound) {
            setResponse(prev => prev = 'Устройство не найдено')
        }
    }

    const createBuyPackRequest = () : BuyPackRequest => ({
        deviceId : props.device.deviceId,
        duration : props.pack.duration,
        price : props.pack.price,
        quota : props.pack.quota,
        rateId : props.rateId
    })

    const doRender = () => {
        if (success) {
            return <div>Пакет приобретен</div>
        }
        else if (response) {
            return <div>{response}</div>
        }
        else {
            return (
                <>
                 <div className="left-block">
            <div className="name"> <span>Устройство</span> {props.device.name?.value}</div>
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
                <div className='iphone'>
                    <img className='iphone11' src={img_iphone} alt="Iphone"/>
                </div>
            </div>
                </>
            )
        }
    }

    return (
        <div className="DisabledDevice" onClick={handleBuyPack}>
           {doRender()}
        </div>
    )
}

