import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"
import { ListenBalanceResponse } from '../../../../../../../../generated/proto.web';
import { STATE_API } from '../../../../../../../../redux/StateApi';

import { WebSocketAdapter } from "./../../../../../../../../codebase/WebSocketAdapter";
import { CONNECTION } from "./../../../../../../../../Connection";
import { waitForClose, Logger} from "./../../../../../../../../utils";

export const CurrentBalance = () => {

    const [balance, setBalance] = React.useState ('0.00');
    const [emptyDevice, setEmptyDevice] = React.useState<boolean>(null);

    const logger = new Logger ('CurrentBalance')

    const closer = waitForClose ()

    React.useEffect (() => {
        const ws = new WebSocketAdapter<any, ListenBalanceResponse> (CONNECTION.listenBalance ())

        const sub = rx.merge (
            ws.connect ()
                .pipe (ro.ignoreElements ()),
            ws.getErrorObservable (),
            ws.getCloseObservable ()
                .pipe (ro.mergeMap (() => rx.throwError (() => "Closed"))),
            ws.getResponseObservable ()
        )
        .pipe (
            ro.mergeMap (CONNECTION.checkStreamResponse),
            ro.tap (response => setBalance (prev => prev = balanceConventer(response.success.balance))),
            ro.takeUntil (closer),
            ro.finalize (() => ws.close ()),
            ro.retryWhen (logger.rx.retry ("Reconnecting"))
        )
        .subscribe (logger.rx.subscribe ("Listen balance"))
        
    })


    React.useEffect(() => {
        
        CONNECTION.listDevices({})
            .pipe (
                ro.tap(response => {
                    if (response.success.devices) {
                        setEmptyDevice(false)
                    }
                    else {
                        setEmptyDevice(true)
                    }
                }),
                ro.tap(() => {
                    if (emptyDevice && parseInt(balance) <= 0) {
                        STATE_API.showPrivateWizard('connectQrCode')
                    }
                }),
                ro.takeUntil(closer)
            )
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [emptyDevice])

    const balanceConventer = (balance : string) : string => {
        return Number(balance).toFixed(2)
    }

    return (
        <div className="CurrentBalance">
            <div className="balance">
                <div className='text'>Текущий баланс<span>{balance} ₽</span></div>
            </div>
        </div>
    )
}
