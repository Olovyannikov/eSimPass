import * as rx from "rxjs/Rx"
import * as React from 'react';

import { Spinner } from '../../components/spinner/Spinner';
import { img_next, img_activeEye, img_disableEye } from '../../../../resources/images';
import { CONNECTION } from '../../../../Connection';
import { LoginRequest, LoginResponse } from '../../../../generated/proto.web';
import { Logger } from "@glonassmobile/codebase-web/Logger";
import { waitForClose } from "../../../../utils";
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

    const [passwordViewMode, setPasswordViewMode] = React.useState<PasswordViewModeModel>({
        img : img_activeEye,
        type : 'password'
    })

    const email = React.useRef<HTMLInputElement>()
    const password = React.useRef<HTMLInputElement>()

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

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
        setError('')
        CONNECTION.login(createLoginRequest())
            .do (parseLoginResponse)
            .takeUntil (closedSubject)
            .subscribe (logger.rx.subscribe ("Error logging in"))
    }

    const parseLoginResponse = (response : LoginResponse) => {
        if (response.invalidEmailOrPassword) {
            setError('Неправильная почта или пароль')
        } else if (response.tooManyErrorAttempts) {
            setError('Много попыток!')
        } else if (response.invalidRequest) {
            setError('Неправильный запрос')
        } else if (response.success) {

        }
        
        setInProgress(prev => prev = false);
    }

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner/>
        } else {
            return <img onClick={handleLogin} src={img_next} className='button-next' alt="Next"/>
        }
    }

    const createLoginRequest = () : LoginRequest => ({
        email : email.current.value,
        password : password.current.value
    })

    const handleEventEnter = (e : React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (document.activeElement === email.current) {
                password.current.focus()
            } else if (document.activeElement === password.current) {
                handleLogin()
            }
        }   
    }

    return (
        <div className="LoginDialog" onClick={(e) => e.stopPropagation ()}>
            <div className="title">Войти в личный кабинет</div>
            <div className="inputs-block">
                <input onKeyDown={(e) => handleEventEnter(e)} ref={email} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                <input onKeyDown={(e) => handleEventEnter(e)} ref={password} disabled={inProgress} required name='password' className='input-password' placeholder='Пароль' type={passwordViewMode.type}/>
                <div onClick={handlePasswordMode} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                {showInProgress()}
                <div className="forgot-password">Восстановить пароль</div>
                <div onClick={() => STATE_API.showAuthWizard('register')} className="forgot-password reg">Зарегистрироваться</div>
                <div className="error">{error}</div>
            </div>
        </div>
    )
}
