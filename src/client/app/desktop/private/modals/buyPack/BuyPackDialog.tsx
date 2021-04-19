/*
import * as React from 'react';

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { CONNECTION } from '../../../../../Connection';
import { BuyPackRequest, BuyPackResponse } from '../../../../../generated/proto.web';
import { BuyPackWizard } from '../../../../../redux/State';
import { STATE_API } from '../../../../../redux/StateApi';
import { waitForClose } from '../../../../../utils';
import { Button } from '../../components/buttons/Button';

interface BuyPackDialogModel {
    pack : BuyPackWizard
}

export const BuyPackDialog = (props : BuyPackDialogModel) => {

    const logger = new Logger('Buy Pack Wizard');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [response, setResponse] = React.useState<string>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    const closeModal = () => STATE_API.hideAuthWizard();

    const handleBuyPack = () => {
        
        setInProgress(prev => prev = true);

        CONNECTION.buyPack(createBuyPackRequest())
            .do(parseBuyPackResponse)
            .delay(2000)
            .do(() => STATE_API.hideAuthWizard())
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error buy pack in'))

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

    const doRender = () => {
        if (success) {
            return <div className="success">Покупка успешно совершена!</div>
        }
        else {
            return (
                <>
                    <div className="title">Подтвердите покупку пакета {props.pack.device.currentPack.rate.operatorName} за {props.pack.device.currentPack.price} ₽ ?</div>
                    <Button disabled={inProgress} className='yes' text='Подтверждаю' func={handleBuyPack} />
                    <Button disabled={inProgress} className='no' text='Отмена' func={closeModal} />
                    <div className="response">{response}</div>
                </>
            )
        }
    }
    
    const createBuyPackRequest = () : BuyPackRequest => ({
        deviceId : props.pack.device.deviceId,
        duration : props.pack.device.currentPack.duration,
        price : props.pack.device.currentPack.price,
        quota : props.pack.device.currentPack.quota,
        rateId : props.pack.device.currentPack?.rate.rateId
    })

    return (
        <div className="BuyPackDialog" onClick={(e) => e.stopPropagation()}>
            {doRender()}
        </div>
    )
}
*/