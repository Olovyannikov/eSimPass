import * as React from 'react';
import * as rx from "rxjs/Rx"

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { CONNECTION } from '../../../../../Connection';
import { RequestPasswordRestoreRequest, RequestPasswordRestoreResponse } from '../../../../../generated/proto.web';
import { convertEndingOfNoun, nothingToNull, waitForClose } from '../../../../../utils';
import { img_next } from '../../../../../resources/images';
import { Spinner } from '../../components/spinner/Spinner';
import { useHistory } from 'react-router';
import { Button } from '../../components/buttons/Button';

export const RestorePassword = () => {

    const logger = new Logger ('Password Restore mobile');

    const closedSubject = waitForClose ();

    const history = useHistory();

    const [email, setEmail] = React.useState<string>(null);
    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    const handlePasswordRestore = () => {

        
        if (nothingToNull(email)) {

            setInProgress(prev => prev = true);

            CONNECTION.requestPasswordRestore(createRequestPasswordRestore())
                .do(parsePasswordRestoreResponse)
                .takeUntil(closedSubject)
                .subscribe(logger.rx.subscribe('Error restore password in'))
        }

        else {
            setError(prev => prev = 'Заполните поле!')
        }

    }

    const parsePasswordRestoreResponse = (response : RequestPasswordRestoreResponse) => {

        if (response.success) {
            handleSuccessResponse()
        }
        else if (response.tooManyErrorAttempts) {
            handleToManyErrorAttemptsResponse(response)
        }
        else if (response.invalidEmail) {
            handlePlainErrorResponse('Неверная электронная почта')
        }
        else if (response.accountNotFound) {
            handlePlainErrorResponse('Аккаунт не существует')
        }
        // else if (response.expired) {
        //     handlePasswordRestore();
        // }   
    }

    const backToMainPage = () => history.push('/')

    const handlePlainErrorResponse = (error : string) => {
        setEmail(null);
        setInProgress(prev => prev = false);
        setError(prev => prev = error)
    }

    const createRequestPasswordRestore = () : RequestPasswordRestoreRequest => ({ email })

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);

    const handleToManyErrorAttemptsResponse = (response : RequestPasswordRestoreResponse) => {
        let secondsToWait = Math.round (parseInt (response.tooManyErrorAttempts) / 1000)
        
        rx.Observable.interval (1000)
            .map (r => secondsToWait - r)
            .do (secondsToWait => {
                
                if (secondsToWait > 0) {
                    setError(prev => prev = `Повторить можно через ${secondsToWait} ${convertEndingOfNoun(secondsToWait)}`);
                    setInProgress(prev => prev = true);
                }
                else {
                    setInProgress(prev => prev = false)
                    setError(null)
                }
            })
            .takeWhile (secondsToWait => secondsToWait > 0)
            .takeUntil (closedSubject)
            .subscribe (logger.rx.subscribe ("Error restore password in"))
    } 

    const handleSuccessResponse = () => {
        setSuccess(prev => prev = true);
    }


    const showError = () => {
        if (error) {
            return <div className="error">{error}</div>
        }
    }

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner />
        }
        else {
            return <img onClick={handlePasswordRestore} src={img_next} className='button-next' alt="Next"/>
        }
    }

    const handleBackToRegistration = () => history.push('/registration');

    const showSuccessResponse = () => {
        if (success) {
            return (
                <>
                    <div className="title-success">Вам на почту отправленна ссылка для восстановления пароля!</div>
                    <Button  func={backToMainPage} className="back-to-main-button" text='Назад' />
                </>
            )
        } 
        else {
            return (<>
                <div className="text">Введите вашу электронную почту, на нее Вам придет ссылка для восстановления пароля.</div>
                <div className="inputs-block">
                    <input onChange={handleInputChange} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                    <div onClick={handleBackToRegistration} className="already-register">Зарегистрироваться</div>
                    {showError()}
                    {showInProgress()}
                </div>
            </>)
        }
    }

    return (
        <div className="RestorePassword">
            <div className="title">Восстановление пароля</div>
            {showSuccessResponse()}
        </div>
    )
}

