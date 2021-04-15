import * as rx from "rxjs/Rx"
import * as React from 'react';

import { Spinner } from '../../components/spinnerPayment/Spinner';
import { useHistory } from 'react-router';
import { CONNECTION } from '../../../../../Connection';
import { GetPaymentRequest } from '../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../utils';
import { STATE_API } from "../../../../../redux/StateApi";

export enum WAIT_STATE {
    PAYMENT_NOT_FOUND,
    WAITING_FOR_PAYMENT,
    PAYMENT_RECEIVED,
    PAYMENT_RECEIVED_WAITING_DEVICE,
    DEVICE_CREATED,
}

export const WaitForPayment = () => {

    const logger = new Logger ('WaitForPayment');

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
            .concatMap (() => createGetPaymentResponse ()
            .map (response => {

                if (response.notReady) {
                    setPaymentStatus(prev => prev = 'Ожидается платеж')
                    return WAIT_STATE.WAITING_FOR_PAYMENT
                }
                else if (response.paymentNotFound) {
                    
                    handlePaymentStatusResponse('Платеж не найден');
                    return WAIT_STATE.PAYMENT_NOT_FOUND
                }
                else if (response.success.paymentReceived?.waitForDevice == true) {
                    
                    handlePaymentStatusResponse('Платеж получен, создаем устройство');
                    return WAIT_STATE.PAYMENT_RECEIVED_WAITING_DEVICE
                }
                else if (response.success.deviceCreated) {
                    handlePaymentStatusResponse('Устройство создано');
                    return WAIT_STATE.DEVICE_CREATED
                }
                else if (response.success.paymentReceived?.waitForDevice == false) {
                    
                    handlePaymentStatusResponse('Платеж получен');
                    return WAIT_STATE.PAYMENT_RECEIVED
                }
                else {
                    setPaymentStatus(prev => prev = 'Ожидается платеж')
                    return WAIT_STATE.WAITING_FOR_PAYMENT
                }
            })
            .do (state => {
                lastState = state
            }))
            .delay (1000)
            .repeat (10)
            .takeWhile (repeat => repeat == WAIT_STATE.WAITING_FOR_PAYMENT || repeat == WAIT_STATE.PAYMENT_RECEIVED_WAITING_DEVICE )
            .takeUntil (rx.Observable.timer (3000))
            .defaultIfEmpty (lastState)
            .delay (1000)
            .do (() => backToCabinet())
            .takeUntil (closedSubject)
            .subscribe(logger.rx.subscribe('Error in createGetPaymentRequest'))
    }

    // let attempt = 0;

    // const getPaymentResponse = () => {

    //     if (window.location.href.endsWith ("paymentNotFound")) {
    //         const response : GetPaymentResponse = {
    //             paymentNotFound : {},
    //         }

    //         return rx.Observable.of (response)
    //             .delay (1000)
    //     }

    //     else if (window.location.href.endsWith ("balancePayment")) {
    //         if (attempt === 0) {
    //             const response : GetPaymentResponse = {
    //                 notReady : {}
    //             }
    //             attempt++
    //             return rx.Observable.of (response)
    //         }
    //         else {
    //             const response : GetPaymentResponse = {
    //                 success : {
    //                     paymentReceived : {
    //                         waitForDevice : false
    //                     }
    //                 }
    //             }
    //             return rx.Observable.of (response)
    //         }
    //     }
    //     else if (window.location.href.endsWith ("devicePayment")) {
    //         if (attempt == 0) {
    //             const response : GetPaymentResponse = {
    //                 notReady : {}
    //             }
    //             attempt++
    //             return rx.Observable.of (response)
    //         }
    //         else if (attempt == 1) {
    //             const response : GetPaymentResponse = {
    //                 success : {
    //                     paymentReceived : {
    //                         waitForDevice : true
    //                     }
    //                 }
    //             }
    //             attempt++
    //             return rx.Observable.of (response)
    //         }
    //         else {
    //             const response : GetPaymentResponse = {
    //                 success : {
    //                     deviceCreated : {}
    //                 }
    //             }
    //             attempt++
    //             return rx.Observable.of (response)
    //         }
    //     } 
    //     else {
    //         const response : GetPaymentResponse = {
    //             notReady : {}
    //         }
    //         return rx.Observable.of(response)
    //     }
    // }

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
//https://toesim-dev.stand.gmdp.io/deeplink/payment/success?paymentId=1615790041178X10116
