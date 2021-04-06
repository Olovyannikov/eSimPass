import * as React from 'react';
import * as rx from "rxjs/Rx"

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { CONNECTION } from '../../../../../../Connection';
import { RequestPasswordRestoreRequest, RequestPasswordRestoreResponse } from '../../../../../../generated/proto.web';
import { convertEndingOfNoun, nothingToNull, waitForClose } from '../../../../../../utils';
import { img_next } from '../../../../../../resources/images';
import { Spinner } from '../../../components/spinner/Spinner';
import { STATE_API } from '../../../../../../redux/StateApi';

export const PasswordRestoreDialog = () => {

    const logger = new Logger ('Password Restore');

    const closedSubject = waitForClose ();

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

    const closeModal = () => STATE_API.hideAuthWizard();

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

    const handleEventEnter = (e : React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePasswordRestore()
        }   
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

    const handleBackToRegistration = () => STATE_API.showPublicWizard('register');

    const showSuccessResponse = () => {
        if (success) {
            return (
                <>
                    <div className="title-success">Вам на почту отправленна ссылка для восстановления пароля!</div>
                    <div onClick={closeModal} className="back-to-main-button">
                        <div className="back-to-main-text">Назад</div>
                    </div>
                </>
            )
        } 
        else {
            return (<>
                <div className="text">Введите вашу электронную почту, на нее Вам придет ссылка для восстановления пароля.</div>
                <div className="inputs-block">
                    <input onChange={handleInputChange} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                    <div onClick={handleBackToRegistration} className="already-register">Зарегистрироваться</div>
                    {showInProgress()}
                    {showError()}
                </div>
            </>)
        }
    }

    return (
        <div onKeyDown={handleEventEnter} className="PasswordRestoreDialog" onClick={(e) => e.stopPropagation()}>
            <div className="title">Восстановление пароля</div>
            {showSuccessResponse()}
        </div>
    )
}

