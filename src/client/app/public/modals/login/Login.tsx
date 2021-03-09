import * as React from 'react';

import { Spinner } from '../../components/spinner/Spinner';
import { img_next, img_activeEye, img_disableEye } from '../../../../resources/images';
import { CONNECTION } from '../../../../Connection';
import { LoginRequest } from '../../../../generated/proto.web';

interface PasswordViewModeModel {
    img : string;
    type : 'text' | 'password';
}

export const Login = () => {

    const [passwordViewMode, setPasswordViewMode] = React.useState<PasswordViewModeModel>({
        img : img_activeEye,
        type : 'password'
    })

    const email = React.useRef<HTMLInputElement>()
    const password = React.useRef<HTMLInputElement>()

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const handleShowPassword = () => {
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
        
        const subscription = CONNECTION.login(createLoginRequest())
            

            
    }

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner/>
        }
        else {
            return <img onClick={handleLogin} src={img_next} className='button-next' alt="Next"/>
        }
    }

    const createLoginRequest = () : LoginRequest => ({
        email : email.current.value,
        password : password.current.value
    })

    return (
        <div className="Login" onClick={(e) => e.stopPropagation ()}>
            <div className="title">Войти в личный кабинет</div>
            <div className="inputs-block">
                <input ref={email} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                <input ref={password} disabled={inProgress} required name='password' className='input-password' placeholder='Пароль' type={passwordViewMode.type}/>
                <div onClick={handleShowPassword} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                {showInProgress()}
                <div className="forgot-password">Восстановить пароль</div>
            </div>
        </div>
    )
}
