import * as React from 'react';

import { Spinner } from '../../components/spinner/Spinner';
import {img_next, img_activeEye, img_disableEye} from '../../../../resources/images';
import { RegisterWebRequest } from '../../../../generated/proto.web';
import { CONNECTION } from '../../../../Connection';

interface PasswordViewModel {
    img : string;
    type : 'text' | 'password';
}

export const Registration = () => {

    const [passwordViewMode, setPasswordViewMode] = React.useState<PasswordViewModel>({
        img : img_activeEye,
        type : 'password',
    })

    const email = React.useRef<HTMLInputElement>();
    const password = React.useRef<HTMLInputElement>();
    const passwordRepeat = React.useRef<HTMLInputElement>();

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

    const handleRegister = () => {
        setInProgress(prev => prev = true)

        const subscription = CONNECTION.registerWeb()
    }

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner />
        } else {
            return <img onClick={handleRegister} src={img_next} className='button-next' alt="Next"/>
        }
    }

    const createRegisterRequest = () : RegisterWebRequest => ({
        email : email.current.value,
        password : password.current.value,
    })

    return (
        <div className="Registration">
            <div className="title">Войти в личный кабинет</div>
            <div className="inputs-block">
                <input ref={email} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                <input ref={password} disabled={inProgress} required name='password' className='input-password' placeholder='Пароль' type={passwordViewMode.type}/>
                <input ref={passwordRepeat} disabled={inProgress} required name='password' className='input-password' placeholder='Повторите пароль' type={passwordViewMode.type}/>
                <div onClick={handleShowPassword} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                {showInProgress()}
                <div className="forgot-password">Восстановить пароль</div>
            </div>
        </div>
    )
}
