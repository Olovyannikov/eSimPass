
import { EMPTY } from "rxjs";
import * as rxaj from "rxjs/ajax"
import * as rx from 'rxjs/Rx'
import {v4 as uuid} from "uuid"
import { WebClientBase } from "./generated/proto.web";
import { Logger } from "@glonassmobile/codebase-web/Logger";

export class Connection extends WebClientBase {

    private readonly logger = new Logger (Connection.name);

    protected readonly connectStream : (path : string) => WebSocket;

    private readonly getUrl = (path : string) => `https://toesim-dev.stand.gmdp.io/http-api${path}`

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
                authorization: localStorage.getItem ('token'),
                'x-request-id': requestId,
                'x-partner-id': 'gm',
                'x-client-platform': 'web',
                'x-client-version': 'snapshot'
            }
        })
        .delay (1000)
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
