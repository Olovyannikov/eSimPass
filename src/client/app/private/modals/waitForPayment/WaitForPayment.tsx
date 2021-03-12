import * as rx from "rxjs/Rx"
import * as React from 'react';

import { Spinner } from '../../components/spinnerPayment/Spinner';
import { useHistory, useLocation } from 'react-router';
import { CONNECTION } from '../../../../Connection';
import { GetPaymentRequest, GetPaymentResponse } from '../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../utils';
import { STATE_API } from "../../../../redux/StateApi";

enum WAIT_STATE {
    PAYMENT_NOT_FOUND,
    WAITING_FOR_PAYMENT,
    PAYMENT_RECEIVED,
    PAYMENT_RECEIVED_WAITING_DEVICE,
    DEVICE_CREATED,
}

export const WaitForPayment = () => {

    const logger = new Logger ('RegistrationDialog');

    const closedSubject = waitForClose ();

    const history = useHistory();

    const location = window.location.href;

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [paymentStatus, setPaymentStatus] = React.useState<string>('Ожидается платеж');

    React.useEffect(() => {

        waitForPayment()

    }, [])

    const waitForPayment = () => {
        let lastState = WAIT_STATE.WAITING_FOR_PAYMENT

        rx.Observable.of ({})
            .concatMap (() => CONNECTION.getPayment (createGetPaymentRequest ())
                .map (response => {
                    if (response.paymentNotFound) {

                        handlePaymentStatusResponse('Платеж не найден');
                        return WAIT_STATE.PAYMENT_NOT_FOUND
                    }
                    else if (response.success.deviceCreated) {

                        handlePaymentStatusResponse('Устройство создано');
                        return WAIT_STATE.DEVICE_CREATED
                    }
                    else if (response.success.paymentReceived.waitForDevice == true) {

                        handlePaymentStatusResponse('Платеж получен, создаем устройство');
                        return WAIT_STATE.PAYMENT_RECEIVED_WAITING_DEVICE
                    }
                    else if (response.success.paymentReceived.waitForDevice == false) {

                        handlePaymentStatusResponse('Платеж получен');
                        return WAIT_STATE.PAYMENT_RECEIVED
                    }
                    else {

                        handlePaymentStatusResponse('Ожидается платеж');
                        return WAIT_STATE.WAITING_FOR_PAYMENT
                    }
                })
                .do (state => {
                    lastState = state
                    console.log('state',state); 
                })
            )
            .delay (1000)
            .repeat (10)
            .takeWhile (repeat => repeat == WAIT_STATE.WAITING_FOR_PAYMENT || repeat == WAIT_STATE.PAYMENT_RECEIVED_WAITING_DEVICE )
            .takeUntil (rx.Observable.timer (10000))
            .defaultIfEmpty (lastState)
            .do (state => {
                console.log('state',state);
                if (state == WAIT_STATE.PAYMENT_NOT_FOUND) {
                    console.log('payment not found');
                    
                }
            })
            .delay (1000)
            .do (() => backToCabinet())
            .takeUntil (closedSubject)        
            .subscribe(logger.rx.subscribe('Error in createGetPaymentRequest'))
    }


    const createGetPaymentRequest = () : GetPaymentRequest => ({
        url : location
    })

    const handlePaymentStatusResponse = (title : string) => {
        setInProgress(prev => prev = false);
        setPaymentStatus(prev => prev = title)
    }

    const renderPaymentStatus = () => {
        if (inProgress) {
            return <Spinner />
        }
    }

    const backToCabinet = () => {
        STATE_API.hideAuthWizard();
        history.push('/cabinet')
    }

    return (
        <div className="WaitForPayment" onClick={(e) => e.stopPropagation()}>
            <div className="title">{ paymentStatus }</div>
            { renderPaymentStatus() }
        </div>
    )
}

//https://toesim-dev.stand.gmdp.io/deeplink/payment/success?paymentId=1615558464422X10110
