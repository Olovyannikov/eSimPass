import * as React from 'react';
import * as rx from "rxjs/Rx"
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { LoginRequest, LoginResponse } from '../../../../../generated/proto.web';
import { img_activeEye, img_disableEye, img_next } from '../../../../../resources/images';
import { STORAGE } from '../../../../../StorageAdapter';
import { convertEndingOfNoun, waitForClose } from '../../../../../utils';
import { CONNECTION } from '../../../../../Connection';
import { Spinner } from '../../components/spinner/Spinner';
import Router from 'next/router';

interface PasswordViewModel {
    img : string;
    type : 'text' | 'password';
} 

export const Login = () => {

    const logger = new Logger ('Registration Dialog mobile');

    const closedSubject = waitForClose ();

    const [error, setError] = React.useState<string>('');
    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [passwordViewMode, setPasswordViewMode] = React.useState<PasswordViewModel>({
        img : img_activeEye,
        type : 'password',
    })
    
    const emailInput = React.useRef<HTMLInputElement>();
    const passwordInput = React.useRef<HTMLInputElement>();

    const handlePasswordMode = () => {
        if (passwordViewMode.type === 'password') {
            setPasswordViewMode(prev => ({
                ...prev,
                img : img_disableEye,
                type : 'text',
            }))
        } else {
            setPasswordViewMode(prev => ({
                ...prev,
                img : img_activeEye,
                type : 'password'
            }))
        }
    }

    const handleLogin = () => {
        setInProgress(prev => prev = true);
        
        setError(null)
        if (checkValidEmail()) {
            CONNECTION.login(createLoginRequest())
                .do (parseLoginResponse)
                .takeUntil (closedSubject)
                .subscribe (logger.rx.subscribe ("Error logging in"))
        }
        else {
            setError(prev => prev = 'Введите корректную почту')
            setInProgress(prev => prev = false)
        }
    }

    const showError = () => {
        if (error) {
            return <div className="error">{error}</div>
        }
    }

    const checkValidEmail = () => {
        const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/;
        if (regExpEmail.test(emailInput.current.value)) {
            return true
        }
    }

    const parseLoginResponse = (response : LoginResponse) => {
        
        if (response.invalidEmailOrPassword) {
            handleInvalidEmailOrPasswordResponse()
        } 
        else if (response.tooManyErrorAttempts) {
            handleToManyErrorAttemptsResponse (response)
        } 
        else if (response.success) {
            handleSuccessResponse(response)
        }
    }

    const handleInvalidEmailOrPasswordResponse = () => {
        setError('Неправильная почта или пароль')
        setInProgress(prev => prev = false)
    }

    const handleToManyErrorAttemptsResponse = (response : LoginResponse) => {
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
            .subscribe (logger.rx.subscribe ("Error logging in"))
    }

    const handleSuccessResponse = (response : LoginResponse) => {
        STORAGE.setToken(response.success.token);
        Router.push('/');
    }

    const createLoginRequest = () : LoginRequest => ({
        email : emailInput.current.value,
        password : passwordInput.current.value
    })

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner/>
        } 
        else {
            return (
                <>
                    <div onClick={handleToRestorePassword} className="forgot-password">Восстановить пароль</div>
                    <div onClick={toRegister} className="already-register">Зарегистрироваться</div>
                    <img onClick={handleLogin} src={img_next} className='button-next' alt="Next"/>
                </>
            )
        }
    }

    const handleToRestorePassword = () => Router.push('/restorePassword')

    const toRegister = () => Router.push('/registration');

    return (
        <div className="Login">
            <div className="title">Войти в личный кабинет</div>
            <div className="inputs-block">
                <input ref={emailInput} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                <input ref={passwordInput} disabled={inProgress} required name='password' className='input-password' placeholder='Пароль' type={passwordViewMode.type}/>
                <div onClick={handlePasswordMode} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                {showError()}
                {showInProgress()}
            </div>
        </div>
    )
}
