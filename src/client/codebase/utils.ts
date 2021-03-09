import { Modals } from "../redux/State";
import { STATE_API } from "../redux/StateApi";
import { PACK_DURATION } from "./../generated/proto.web";

export interface ICountUnit {
    quota? : number;
    used? : number;
    unit? : Unit
}

export type Unit = 'МБ' | 'ГБ';

export const dateUntil = (date : string, duration? : PACK_DURATION) => {

    const boughtDate = new Date(date)

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

export const percentOfPackage = (quota : number, used : number) : number => {
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

export const countUnit = (quota : number, used? : number) : ICountUnit => {
    let restQuota = quota - used
    let unit : Unit;
    if (quota >= 1048576000) {
        unit = 'ГБ'
        quota = convertToGB(quota)
        restQuota = convertToGB(restQuota)
    } else if (quota < 1048576000) {
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

export const openModal = (modal : Modals) => {
    const modalBlock = document.getElementsByClassName('Modals')[0]
    modalBlock.classList.add('active')
    STATE_API.setModal(modal)
}

export const closeModal = () => {
    const modalBlock = document.getElementsByClassName('Modals')[0]
    modalBlock.classList.remove('active')
}

export const setColorBar = (percent : number) => {
    if (percent >= 50) {
        return 'rgba(29, 190, 104, 1)';
    }
    else if (percent < 50 && percent > 25) {
        return 'rgba(255, 137, 29, 1)';
    } 
    else return 'rgba(214, 36, 36, 1)';
}

export const convertToGB = (quota : number) : number => {
    return Number((quota / 1024 / 1024 / 1000).toFixed(0))
}

export const convertToMB = (quota : number) : number => {
    return Number((quota / 1024 / 1024).toFixed(0))
}

export const handleErrorResponse = (response : string) : string => {
    switch (response) {
        case 'invalidEmail':
            return 'Неправильная почта';

        case 'invalidPassword':
            return 'Неправильный пароль';
        
        case 'emailAlreadyUsed': 
            return 'Почта уже используется';
        
        case 'tooManyAttempts': 
            return 'Слишком много попыток';

        case 'invalidRequest':
            return 'Неправильный запрос';
    
        case 'invalidEmailOrPassword':
            return 'Неправильная почта или пароль';
            
        default:
            break;
    }
}
