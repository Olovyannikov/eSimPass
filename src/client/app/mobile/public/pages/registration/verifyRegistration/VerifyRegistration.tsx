import * as React from 'react';

import * as rx from "rxjs/Rx"
import { VerifyMobileCodeRequest, VerifyMobileCodeResponse} from '../../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { convertEndingOfNoun, waitForClose } from '../../../../../../utils';
import { Button } from '../../../components/buttons/Button';
import { CONNECTION } from '../../../../../../Connection';
import { useHistory } from 'react-router';
import { STORAGE } from '../../../../../../StorageAdapter';
import { img_next, img_retry } from '../../../../../../resources/images';
import { Spinner } from '../../../components/spinner/Spinner';

interface VerifyRegistrationModel {
    handleRegistration? : () => void;
    email? : string;
    token? : string;
}

export const VerifyRegistration = (props : VerifyRegistrationModel) => {

    const logger = new Logger ('Verify Registration mobile');

    const closedSubject = waitForClose ();

    const codeInput = React.useRef<HTMLInputElement>();

    const history = useHistory();

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const createVerifyRegisterRequest = () : VerifyMobileCodeRequest => ({
        token : props.token,
        mobileCode : Number(codeInput.current.value),
    })

    const parseVerifyRegisterMobileResponse = (response : VerifyMobileCodeResponse) => {
        if (response.tooManyErrorAttempts) {
            handleToManyErrorAttemptsResponse(response)
        }
        else if (response.expired) {
            handlePlainErrorResponse('Код устарел')
        }
        else if (response.invalidCode) {
            handlePlainErrorResponse('Неверный код')
        }
        else if (response.success) {
            handleSuccessResponse(response)
        }
    }

    const handleToManyErrorAttemptsResponse = (response : VerifyMobileCodeResponse) => {
        let secondsToWait = Math.round (parseInt (response.tooManyErrorAttempts) / 1000)
        
        rx.Observable.interval (1000)
            .map (r => secondsToWait - r)
            .do (secondsToWait => {
                
                if (secondsToWait > 0) {
                    setError(prev => prev = `Повторить можно через ${secondsToWait} ${convertEndingOfNoun(secondsToWait)}`);
                }
                else {
                    setInProgress(prev => prev = false)
                    setError(null)
                }
            })
            .takeWhile (secondsToWait => secondsToWait > 0)
            .takeUntil (closedSubject)
            .subscribe (logger.rx.subscribe ("Error verify mobile code in"))
    } 

    const handleVerifyRegisterModileCode = () => {

        if (checkValidInput()) {
            
            setInProgress(prev => prev = true);

            CONNECTION.verifyMobileCode(createVerifyRegisterRequest())
                .do(parseVerifyRegisterMobileResponse)
                .do(() => setInProgress(prev => prev = true))
                .takeUntil(closedSubject)
                .subscribe(logger.rx.subscribe('Error verify in'))

        }
    }

    const handleSuccessResponse = (response : VerifyMobileCodeResponse) => {
        STORAGE.setToken(response.success.token)
        history.push('/connectEsim')

    }

    const handlePlainErrorResponse = (error : string) => {
        setError(prev => prev = error)
        setInProgress(prev => prev = false);
    }

    const checkValidInput = () => {
        if (codeInput.current.value.length < 4 || codeInput.current.value.length > 4) {
            setError(prev => prev = 'Код должен состоять из четырех цифр')
        }
        else if (codeInput.current.value.length === 4) {
            return true;
        }
    }

    const showError = () => {
        if (error) return <div className="error">{error}</div>
    }

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner />
        } 
        else {
            return <img onClick={handleVerifyRegisterModileCode} src={img_next} className='next-button' alt="Завершить регистрацию"/>
        }
    }

    return (
        <div className="VerifyRegistration">
            <div className="title-success">На <span>{props.email}</span> отправлено письмо с кодом для подтверждения регистрации</div>
            <input disabled={inProgress} placeholder='Введите код' ref={codeInput} className='input-code' pattern="\d*" type="text"/>
            <img src={img_retry} className='retry' onClick={props.handleRegistration} alt="Retry"/>
            {showError()}
            {/* <Button disabled={inProgress} className='verify-button' func={props.handleRegistration} text='Отправить код еще раз' /> */}
            {showInProgress()}
        </div>
    )
}
