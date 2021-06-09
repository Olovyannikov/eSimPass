import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { Spinner } from '../../components/spinnerPayment/Spinner';
import { CONNECTION } from '../../../../../Connection';
import { GetPaymentRequest } from '../../../../../generated/proto.web';
import { waitForClose, Logger } from '../../../../../utils';
import { STATE_API } from "../../../../../redux/StateApi";
import { useRouter } from 'next/router';

export enum WAIT_STATE {
    PAYMENT_NOT_FOUND,
    WAITING_FOR_PAYMENT,
    PAYMENT_RECEIVED,
    PAYMENT_RECEIVED_WAITING_DEVICE,
    DEVICE_CREATED,
}
export const WaitForPayment = () => {

    const logger = new Logger ('WaitForPayment');

    const router = useRouter();

    const closedSubject = waitForClose ();

    const location = window.location.href;

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [paymentStatus, setPaymentStatus] = React.useState<string>('Ожидается платеж');

    React.useEffect(() => {

        waitForPayment()
        
    }, [])
    
    const waitForPayment = () => {

        let lastState = WAIT_STATE.WAITING_FOR_PAYMENT
        
        rx.of ({})
            .pipe (
                ro.concatMap (() => createGetPaymentResponse ()
                .pipe (
                    ro.map (response => {
                    
                        if (response.notReady) {
                            setPaymentStatus(prev => prev = 'Ожидается платеж')
                            return WAIT_STATE.WAITING_FOR_PAYMENT
                        }
                        else if (response.paymentNotFound) {
                            handlePaymentStatusResponse('Платеж не найден');
                            return WAIT_STATE.PAYMENT_NOT_FOUND
                        }
                        else if (response.success.deviceId?.value) {
                            handlePaymentStatusResponse('Устройство создано');
                            return WAIT_STATE.DEVICE_CREATED
                        }
                        else if (response.success) {
                            handlePaymentStatusResponse('Платеж получен');
                            return WAIT_STATE.PAYMENT_RECEIVED
                        }
                        else {
                            setPaymentStatus(prev => prev = 'Ожидается платеж')
                            return WAIT_STATE.WAITING_FOR_PAYMENT
                        }
                    }),
                    ro.tap (state => {
                        lastState = state
                    })
                )
            ),
            ro.delay (1000),
            ro.repeat (10),
            ro.takeWhile (repeat => repeat == WAIT_STATE.WAITING_FOR_PAYMENT),
            ro.takeUntil (rx.timer (3000)),
            ro.defaultIfEmpty (lastState),
            ro.delay (1000),
            ro.tap (() => backToCabinet()),
            ro.takeUntil (closedSubject)
        )
        .subscribe(logger.rx.subscribe('Error in createGetPaymentRequest'))
    }

    const createGetPaymentRequest = () : GetPaymentRequest => ({
        url : location
    })

    const createGetPaymentResponse = () => CONNECTION.getPayment(createGetPaymentRequest())

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
        window.history.pushState({}, '', '/cabinet')
    }

    return (
        <div className="WaitForPayment" onClick={(e) => e.stopPropagation()}>
            <div className="title">{ paymentStatus }</div>
            { renderPaymentStatus() }
        </div>
    )
}
