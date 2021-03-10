import * as rx from "rxjs/Rx"
import * as React from 'react';

import { Spinner } from '../../components/spinner/Spinner';
import { img_next, img_activeEye, img_disableEye } from '../../../../resources/images';
import { CONNECTION } from '../../../../Connection';
import { LoginRequest, LoginResponse } from '../../../../generated/proto.web';
import { Logger } from "@glonassmobile/codebase-web/Logger";
import { waitForClose, convertEndingOfNoun } from "../../../../utils";
import { STATE_API } from "../../../../redux/StateApi";

interface PasswordViewModeModel {
    img : string;
    type : 'text' | 'password';
}

export const LoginDialog = () => {

    const logger = new Logger ("LoginDialog")

    const closedSubject = waitForClose ();

    React.useEffect (() => {
        return () => closedSubject.next ()
    },[])

    const [email, setEmail] = React.useState<string>(null);
    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(null);
    const [passwordViewMode, setPasswordViewMode] = React.useState<PasswordViewModeModel>({
        img : img_activeEye,
        type : 'password'
    })

    const emailInput = React.useRef<HTMLInputElement>()
    const passwordInput = React.useRef<HTMLInputElement>()


    const handlePasswordMode = () => {
        if (passwordViewMode.type === 'password') {
            setPasswordViewMode(prev => ({
                ...prev,
                img : img_disableEye,
                type : 'text'
            }))
        } else {
            setPasswordViewMode(prev =>({
                ...prev,
                img : img_activeEye,
                type : 'password'
            }))
        }
    }

    const handleLogin = () => {
        setInProgress(prev => prev = true);
        
        setError(null)

        CONNECTION.login(createLoginRequest())
            .do (parseLoginResponse)
            .takeUntil (closedSubject)
            .subscribe (logger.rx.subscribe ("Error logging in"))
    }

    const handleRegisterClicked = () => STATE_API.showAuthWizard('register');

    const showError = () => {
        if (error) {
            return <div className="error">{error}</div>
        }
    }

    const handleChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => setEmail(prev => prev = e.target.value);

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
        setInProgress(prev => prev = false);
        window.localStorage.setItem('token', response.success.token);
        STATE_API.setAuthenticated(email);
        STATE_API.hideAuthWizard()
    }

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner/>
        } else {
            return <img onClick={handleLogin} src={img_next} className='button-next' alt="Next"/>
        }
    }

    const createLoginRequest = () : LoginRequest => ({
        email : emailInput.current.value,
        password : passwordInput.current.value
    })

    const handleEventEnter = (e : React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (document.activeElement === emailInput.current) {
                passwordInput.current.focus()
            } else if (document.activeElement === passwordInput.current) {
                handleLogin()
            }
        }   
    }

    return (
        <div className="LoginDialog" onClick={(e) => e.stopPropagation ()}>
            <div className="title">Войти в личный кабинет</div>
            <div className="inputs-block">
                <input onKeyDown={handleEventEnter} ref={emailInput} disabled={inProgress} required name='email' onChange={handleChangeEmail} className='input-email' placeholder='Эл.почта' type="text"/>
                <input onKeyDown={handleEventEnter} ref={passwordInput} disabled={inProgress} required name='password' className='input-password' placeholder='Пароль' type={passwordViewMode.type}/>
                <div onClick={handlePasswordMode} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                {showInProgress()}
                <div className="forgot-password">Восстановить пароль</div>
                <div onClick={handleRegisterClicked} className="registration">Зарегистрироваться</div>
                {showError()}
            </div>
        </div>
    )
}
