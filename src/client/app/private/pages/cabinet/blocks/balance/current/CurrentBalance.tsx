import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import * as rx from "rxjs/Rx"
import { ListenBalanceResponse } from '../../../../../../../generated/proto.web';

import {WebSocketAdapter} from "./../../../../../../../codebase/WebSocketAdapter";
import {CONNECTION} from "./../../../../../../../Connection";
import {waitForClose} from "./../../../../../../../utils";

export const CurrentBalance = () => {

    const [balance, setBalance] = React.useState ('0.00');

    const logger = new Logger ('CurrentBalance')

    const closer = waitForClose ()

    React.useEffect (() => {
        const ws = new WebSocketAdapter<any, ListenBalanceResponse> (CONNECTION.listenBalance ())

        const sub = rx.Observable.merge (
            ws.connect ().ignoreElements (),
            ws.getErrorObservable (),
            ws.getCloseObservable ().flatMap (() => rx.Observable.throwError ("Closed")),
            ws.getResponseObservable ()
        )
        .flatMap (CONNECTION.checkStreamResponse)
        .do (response => setBalance (prev => prev = balanceConventer(response.success.balance)))
        .takeUntil (closer)
        .finally (() => ws.close ())
        .retryWhen (logger.rx.retry ("Reconnecting"))
        .subscribe (logger.rx.subscribe ("Listen balance"))
    })

    const balanceConventer = (balance : string) : string => {
        return Number(balance).toFixed(2)
    }

    return (
        <div className="CurrentBalance">
            <div className="balance">
                <div className='text'>Текущий баланс<span>{balance} €</span></div>
            </div>
        </div>
    )
}
