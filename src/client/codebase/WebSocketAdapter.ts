import * as rx from "rxjs/Rx"

export class WebSocketAdapter<R,T> {
    private readonly errorObservable = new rx.ReplaySubject<void> (1);
    private readonly closeObservable = new rx.ReplaySubject<void> (1);
    
    public readonly getErrorObservable = () => this.errorObservable.flatMap (error => rx.Observable.throwError (error))
    public readonly getCloseObservable = () => this.closeObservable.take (1);
    public readonly getMessageObservable = () => rx.Observable.fromEvent<MessageEvent> (this.socket, 'message')
        .map (event => event.data)
    
        public readonly getResponseObservable = () => rx.Observable.fromEvent<MessageEvent> (this.socket, 'message')
        .map (event => JSON.parse (event.data) as T)

    constructor (public readonly socket : WebSocket, responseCheker  : (response : T) => rx.Observable<T> = response => rx.Observable.of (response)) {
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
            }, 1000);
            
            this.socket.addEventListener ('close', () => {
                clearInterval (interval)
            })
            this.socket.addEventListener ('error', () => {
                clearInterval (interval)
            })    
        })
    }

    public readonly connect = () => rx.Observable.merge (
            rx.Observable.fromEvent (this.socket, 'open'),
            this.getErrorObservable ()
        )
        .take (1)
        .map (() => {})


    public readonly send = (request: R) => this.socket.send (JSON.stringify (request))

    public readonly close = () => this.socket.close ();

    private readonly onError = (error : any) => {
        this.errorObservable.next (error);
        this.close ()
    }
}