import * as rxaj from "rxjs/ajax"
import * as rx from "rxjs"
import * as ro from "rxjs/operators"
import {v4 as uuid} from "uuid"
import { WebClientBase } from "./generated/proto.web";
import { Logger } from './utils'
import { STORAGE } from './StorageAdapter';

export class Connection extends WebClientBase {

    private readonly logger = new Logger (Connection.name);

    protected readonly connectStream = (path : string) : WebSocket => new WebSocket (`wss://toesim-dev.stand.gmdp.io/http-api${path}?authorization=${STORAGE.getToken()}&x-request-id=${uuid().toString()}&x-partner-id=gm&x-client-platform=web&x-client-version=SNAPSHOT`)
   

    private readonly getUrl = (path : string) => `https://toesim-dev.stand.gmdp.io/http-api${path}`

    public readonly checkStreamResponse = <T>(response : T) => {
        if ((response as any).unauthorized) {
            localStorage.clear ()
            window.location.reload ()

            return rx.EMPTY
        }
        else {
            return rx.of (response)
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
        .pipe (
            ro.flatMap (response => {
                if (window.location.port == "9999") {
                    return rx.timer (0)
                        .pipe (
                            ro.map (() => response)
                        )                        
                }
                else {
                    return rx.of (response)
                }
            }),
            ro.flatMap (response => {
                executed = true
    
                if (response.status == 200) {
                    if (((response.response) as any).invalidRequest) {
                        console.error (JSON.stringify (response, null, 4))
                        return rx.EMPTY
                    }
                    else if (((response.response) as any).unauthorized) {
                        localStorage.clear ()
                        window.location.reload ()
                    }
                    else {
                        return rx.of (response.response)
                    }
                }
                else {
                    return rx.throwError(() => response.status)
                }
            }),
            ro.retryWhen(this.logger.rx.retry(`Error executing "${url}"`))        
        )

    }
}

export const CONNECTION = new Connection ()
