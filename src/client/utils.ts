import * as React from 'react';
import * as rx from "rxjs/Rx"

export const nothingToNull = (value: string) : string => {
    if (value == null) {
        return null
    }
    else {
        value = value.trim()

        if (value.length === 0) {
            return null
        }
        else {
            return value;
        }
    }
}

export const waitForClose = () => {
    const result = new rx.Subject<void> ();

    React.useEffect (() => {
        return () => result.next ()
    },[])

    return result;
}

export const convertEndingOfNoun = (seconds : number) => {

    const str = seconds.toString ()
    if (str.endsWith ("1")) {
        return 'секунду'
    }
    else if (str.endsWith('2') || str.endsWith('3') || str.endsWith('4')) {
        return 'секунды'
    } 
    else {
        return 'секунд'
    }
}

export class TokenController {

    public setToken(token : string) : void {
        window.localStorage.setItem('token', token)
    }

    public deleteToken() : void {
        window.localStorage.removeItem('token')
    }

    public getToken() : string {
        return window.localStorage.getItem('token')
    }
}


