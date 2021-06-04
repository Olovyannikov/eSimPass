import * as rx from "rxjs"
import * as ro from "rxjs/operators"

export class WebSocketAdapter<R,T> {
    private readonly errorObservable = new rx.ReplaySubject<void> (1);
    private readonly closeObservable = new rx.ReplaySubject<void> (1);
    
    public readonly getErrorObservable = () => this.errorObservable
        .pipe (ro.mergeMap (error => rx.throwError (() => error)))
    
    public readonly getCloseObservable = () => this.closeObservable
        .pipe (ro.first ())

    public readonly getMessageObservable = () => rx.fromEvent<MessageEvent> (this.socket, 'message')
        .pipe (ro.map (event => event.data))
    
    public readonly getResponseObservable = () => rx.fromEvent<MessageEvent> (this.socket, 'message')
        .pipe (ro.map (event => JSON.parse (event.data) as T))

    constructor (public readonly socket : WebSocket, responseCheker  : (response : T) => rx.Observable<T> = response => rx.of (response)) {
        this.socket.addEventListener ('error', (event : ErrorEvent) => this.onError(event.error))
        this.socket.addEventListener ('close', () => this.closeObservable.next ())

        this.socket.addEventListener ('open', () => {
            const interval = setInterval (()=> {
                try {
                    this.socket.send ('heartbeat')
                }
                catch (error) {
                    clearInterval (interval)
                }
            }, 5000);
            
            this.socket.addEventListener ('close', () => {
                clearInterval (interval)
            })
            this.socket.addEventListener ('error', () => {
                clearInterval (interval)
            })    
        })
    }

    public readonly connect = () => rx.merge (
            rx.fromEvent (this.socket, 'open'),
            this.getErrorObservable ()
        )
        .pipe (
            ro.take (1),
            ro.map (() => {})
        )


    public readonly send = (request: R) => this.socket.send (JSON.stringify (request))

    public readonly close = () => this.socket.close ();

    private readonly onError = (error : any) => {
        this.errorObservable.next (error);
        this.close ()
    }
}
