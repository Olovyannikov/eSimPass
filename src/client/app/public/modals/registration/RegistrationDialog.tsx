import * as React from 'react';

import { Spinner } from '../../components/spinner/Spinner';
import { STATE_API } from '../../../../redux/StateApi';
import {img_next, img_activeEye, img_disableEye} from '../../../../resources/images';
import { RegisterWebRequest } from '../../../../generated/proto.web';
import { CONNECTION } from '../../../../Connection';

interface PasswordViewModel {
    img : string;
    type : 'text' | 'password';

}

export const RegistrationDialog = () => {

    const [error, setError] = React.useState<string>('');
    const [passwordViewMode, setPasswordViewMode] = React.useState<PasswordViewModel>({
        img : img_activeEye,
        type : 'password',
    })

    const emailInput = React.useRef<HTMLInputElement>();
    const passwordInput = React.useRef<HTMLInputElement>();
    const passwordRepeatInput = React.useRef<HTMLInputElement>();

    const [inProgress, setInProgress] = React.useState<boolean>(false);

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

    const handleLoginClicked = () => STATE_API.showAuthWizard('login');

    const showError = () => {
        if (error) {
            return <div className="error">{error}</div>
        }
    }

    const handleRegister = () => {
        setInProgress(prev => prev = true)
        CONNECTION.registerWeb(createRegisterRequest())

    }

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner />
        } else {
            return <img onClick={handleRegister} src={img_next} className='button-next' alt="Next"/>
        }
    }

    const createRegisterRequest = () : RegisterWebRequest => ({
        email : emailInput.current.value,
        password : passwordInput.current.value,
    })

    const handleEventEnter = (e : React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (document.activeElement === emailInput.current) {
                passwordInput.current.focus();
            }
            else if (document.activeElement === passwordInput.current) {
                passwordRepeatInput.current.focus();
            }
            else if (document.activeElement === passwordRepeatInput.current) {
                handleRegister()
            }
        }   
    }

    return (
        <div className="RegistrationDialog" onClick={(e) => e.stopPropagation()}>
            <div className="title">Регистрация</div>
            <div className="inputs-block">
                <input onKeyDown={handleEventEnter} ref={emailInput} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                <input onKeyDown={handleEventEnter} ref={passwordInput} disabled={inProgress} required name='password' className='input-password' placeholder='Пароль' type={passwordViewMode.type}/>
                <div onClick={handlePasswordMode} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                <input onKeyDown={handleEventEnter} ref={passwordRepeatInput} disabled={inProgress} required name='password' className='input-password' placeholder='Повторите пароль' type={passwordViewMode.type}/>
                <div onClick={handlePasswordMode} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                {showInProgress()}
                <div onClick={handleLoginClicked} className="forgot-password reg">Уже зарегистрирован</div>
                {showError()}
            </div>
        </div>
    )
}
