import * as rx from "rxjs/Rx"
import * as React from 'react';

import { CONNECTION } from '../../../../../Connection';
import { GetDevicePaymentAmmountResponse, CreateDevicePaymentResponse, CreateDevicePaymentRequest } from '../../../../../generated/proto.web';
import { STATE_API } from '../../../../../redux/StateApi';
import { Button } from '../../components/buttons/Button';
import { waitForClose } from "../../../../../utils";
import { Logger } from "@glonassmobile/codebase-web/Logger";

export const ConfirmPurchase = () => {

    const logger = new Logger('ConfirmPurchaseDialog');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>(null);
    const [paymentAmount, setPaymentAmount] = React.useState<string>(null);

    React.useEffect(() => {

        CONNECTION.getDevicePaymentAmmount({})
            .do(response => {
                if (response.ammount) {
                    handleSuccessDevicePaymentAmount(response)
                }
                else {
                    handlePlainErrorResponse('Ошибка при получении цены устройства')
                }
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in get device payment amount'));

    }, [])

    const closeModal = () => STATE_API.hideAuthWizard();

    const handleSuccessDevicePaymentAmount = (response : GetDevicePaymentAmmountResponse) => {
        setPaymentAmount(prev => prev = response.ammount);
        setInProgress(prev => prev = false);
    }

    const handlePlainErrorResponse = (error : string) => {
        setError(prev => prev = error);
        setInProgress(prev => prev = false);
    }

    const handleConfirmPurchase = () => {

        setInProgress(prev => prev = true);

        CONNECTION.createDevicePayment(createDevicePaymentRequst())
            .do(response => {
                if (response.success) {
                    handleSuccessResponse(response);
                }
                else {
                    handlePlainErrorResponse('Ошибка!')
                }
            })
            .delay(2000)
            .do(closeModal)
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in create device payment request'))
    }

    const handleSuccessResponse = (response : CreateDevicePaymentResponse) => {
        setInProgress(prev => prev = false);
        window.open(response.success.url);
    }

    const createDevicePaymentRequst = () : CreateDevicePaymentRequest => ({})

    const showError = () => {
        if (error) {
            return <div className="error">{error}</div>
        }
    }

    return (
        <div className="ConfirmPurchase" onClick={(e) => e.stopPropagation()}>
            <div className="title">Подтвердите покупку QR-кода за {paymentAmount} ₽ ?</div>
            <Button func={handleConfirmPurchase} disabled={inProgress} className='yes' text='Подтверждаю' />
            <Button disabled={inProgress} className='no' text='Отмена' func={closeModal} />
            {showError()}
        </div>
    )
}
// https://toesim-dev.stand.gmdp.io/deeplink/payment/success?paymentId=1616683325716X10282
// https://toesim-dev.stand.gmdp.io/deeplink/payment/success?paymentId=1616683746500X10284
