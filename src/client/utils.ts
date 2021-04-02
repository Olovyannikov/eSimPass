import * as React from 'react';
import * as rx from "rxjs/Rx"
import { PACK_DURATION } from './generated/proto.web';

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

export const restPercentOfPackageQuota = (quota : number, used : number) : number => {
    const restQuota = quota - used
    let percent = restQuota / quota * 100

    if (restQuota >= quota) {
        return 100
    } 
    else if (percent <= 5) {
        return 6.5
    } 
    else {
        return percent
    }
}

export const setColorBar = (percent : number) => {
    if (percent >= 50) {
        // green
        return 'rgba(29, 190, 104, 1)';
    }
    else if (percent < 50 && percent > 25) {
        // orange
        return 'rgba(255, 137, 29, 1)';
    } 
        // red 
    else return 'rgba(214, 36, 36, 1)';
}

export const convertToGB = (quota : number) : number => {
    return Number((quota / 1024 / 1024 / 1000).toFixed(0))
}

export const convertToMB = (quota : number) : number => {
    return Number((quota / 1024 / 1024).toFixed(0))
}

export interface ConventerUnitModel {
    quota? : number;
    used? : number;
    unit? : Unit
}

export type Unit = 'МБ' | 'ГБ';

export const unitConventer = (quota : number, used? : number) : ConventerUnitModel => {
    let restQuota = quota - used
    let unit : Unit;
    
    

    if (quota >= 1048576000) {
        unit = 'ГБ'
        quota = convertToGB(quota)
        restQuota = convertToGB(restQuota)
    }
    else if (quota < 1048576000) {
        unit = 'МБ'
        quota = convertToMB(quota)
        restQuota = convertToMB(restQuota)
    }
    used = restQuota
    

    return {
        quota,
        used,
        unit
    }
}

export const convertDateUntilPackage = (date : string, duration? : PACK_DURATION) => {
    
    const boughtDate = new Date(Number(date))    

    switch (duration) {
        case PACK_DURATION.DAY:
            return  new Date (boughtDate.setDate(boughtDate.getDate() + 1))
    
        case PACK_DURATION.WEEK:
            return new Date (boughtDate.setDate(boughtDate.getDate() + 7))

        case PACK_DURATION.TWO_WEEKS:
            return new Date (boughtDate.setDate(boughtDate.getDate() + 14))
        
        case PACK_DURATION.MONTH:
            return new Date (boughtDate.setDate(boughtDate.getDate() + 31))

        default:
            break;
    }
}

export const convertDurationType = (amount : PACK_DURATION) => {
    if (amount === PACK_DURATION.DAY) {
        return '1 дн.'
    }
    else if (amount === PACK_DURATION.WEEK) {
        return '7 дн.'
    }
    else if (amount === PACK_DURATION.TWO_WEEKS) {
        return '14 дн.'
    }
    else if (amount === PACK_DURATION.MONTH) {
        return '31 дн.'
    }
}
