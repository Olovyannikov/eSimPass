import { EMPTY } from "rxjs";
import * as rxaj from "rxjs/ajax"
import * as rx from 'rxjs/Rx'
import {v4 as uuid} from "uuid"
import { WebClientBase } from "./generated/proto.web";
import { Logger } from './utils'
import { STORAGE } from './StorageAdapter';

export class Connection extends WebClientBase {

    private readonly logger = new Logger (Connection.name);

    protected readonly connectStream = (path : string) : WebSocket => new WebSocket (`wss://esimpass-dev.stand.gmdp.io/http-api${path}?authorization=${STORAGE.getToken()}&x-request-id=${uuid().toString()}&x-partner-id=gm&x-client-platform=web&x-client-version=SNAPSHOT`)
   

    private readonly getUrl = (path : string) => `https://esimpass-dev.stand.gmdp.io/http-api${path}`

    public readonly checkStreamResponse = <T>(response : T) => {
        if ((response as any).unauthorized) {
            localStorage.clear ()
            window.location.reload ()

            return rx.Observable.empty ()
        }
        else {
            return rx.Observable.of (response)
        }
    }

    protected readonly executeCall = (path: string, request: any) => {

        const requestId = uuid().toString()
        
        let executed = false;

        const url = this.getUrl (path)

        return rxaj.ajax ({
            url,
            body: JSON.stringify(request),
            method: "POST",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                authorization: STORAGE.getToken(),
                'x-request-id': requestId,
                'x-partner-id': 'gm',
                'x-client-platform': 'web',
                'x-client-version': STORAGE.VERSION
            }
        })
        .flatMap (response => {
            if (window.location.port == "9999") {
                return rx.Observable.timer (0)
                    .map (() => response)
            }
            else {
                return rx.Observable.of (response)
            }
        })
        .flatMap (response => {
            executed = true

            if (response.status == 200) {
                if (response.response.invalidRequest) {
                    console.error (JSON.stringify (response, null, 4))
                    return EMPTY
                }
                else if (response.response.unauthorized) {
                    localStorage.clear ()
                    window.location.reload ()
                }
                else {
                    return rx.Observable.of (response.response)
                }
            }
            else {
                return rx.Observable.throwError(response.status)
            }
        })
        .retryWhen(this.logger.rx.retry(`Error executing "${url}"`))        
    }
}

export const CONNECTION = new Connection ()
