import * as React from 'react';
import Router from 'next/router';
import { CONNECTION } from '../../../../../../../../../Connection';

import { BuyPackRequest, BuyPackResponse, ListDevicesResponse, ListRatesResponse } from '../../../../../../../../../generated/proto.web';
import { img_iphone } from '../../../../../../../../../resources/images';
import { waitForClose, Logger } from '../../../../../../../../../utils';
import { ProgressBar } from '../../../../../../components/progressBar/ProgressBar';
import { Spinner } from '../../../../../../components/spinnerPayment/Spinner';

interface DeviceModel {
    device : ListDevicesResponse.SuccessModel.DeviceModel;
    pack? : ListRatesResponse.SuccessModel.RateModel.PackModel;
    countryId? : string;
}

export const Device = (props : DeviceModel) => {

    const logger = new Logger('Buy Pack Device');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [response, setResponse] = React.useState<string>(null);

    const handleDateUntul = (finished : string) => new Date(+finished).toLocaleDateString();

    const handleBuyPack = () => {

        setInProgress(prev => prev = true)

        CONNECTION.buyPack(createBuyPackRequest ())
            .do(parseBuyPackResponse)
            .delay(500)
            .do(() => Router.push('/cabinet'))
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))
        
    }

    const parseBuyPackResponse = (response : BuyPackResponse) => {
        if (response.success) {
            setResponse(prev => prev = 'Пакет успешно приобретен')
        }
        else if (response.packNotFound) {
            setResponse(prev => prev = 'Пакет не найден')
        }
        else if (response.countryNotFound) {
            setResponse(prev => prev = 'Страна не найдена')
        }
        else if (response.notEnoughFunds) {
            setResponse(prev => prev = 'Недостаточно средств')
        }
        else if (response.deviceNotFound) {
            setResponse(prev => prev = 'Устройство не найдено')
        }

        setInProgress(prev => prev = false)
    }

    const createBuyPackRequest = () : BuyPackRequest => ({
        deviceId : props.device.deviceId,
        duration : props.pack.duration,
        countryId : props.countryId
    })

    const doRender = () => {
        if (inProgress) {
            return <Spinner />
        }
        else if (response) {
            return <div className='response'>{response}</div>
        }
        else {
            return (
                <>
                    <div className="left-block">
                        <div className="name"> <span>Устройство</span> {props.device.name?.value}</div>
                        <div className="rate-info">
                            <div className="rate">
                                <div>eSIM {props.device.currentPack.operatorName}</div>
                            </div>
                            <div className="device-info">
                                iPhone 11 Pro
                            </div>
                        </div>
                        <div className="country">
                            {props.device.currentPack.countryName}
                        </div>
                        <ProgressBar quota={props.device.currentPack.quota} used={props.device.currentPack.activated.usedBytes} />
                        <div className="until">Действует до <span className='date'>{handleDateUntul(props.device.currentPack.activated.finished)}</span></div>
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
        <div className="Device" onClick={handleBuyPack}>
            {doRender()}
        </div>
    )
}
