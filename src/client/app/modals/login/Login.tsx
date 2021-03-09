import * as React from 'react';

import next from '../../../img/next.png';

import { CONNECTION } from '../../../Connection';
import { STATE_API } from '../../../redux/StateApi';
import { Spinner } from '../../components/spinner/Spinner';
import { LoginRequest, LoginResponse } from '../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase/client/Logger';
import { handleErrorResponse } from '../../../codebase/utils';

interface Response extends LoginResponse {
    response? : string
}

export const Login = () => {

    const logger = new Logger ("Login");

    const email = React.useRef<HTMLInputElement>();
    const password = React.useRef<HTMLInputElement>();

    const [error, setError] = React.useState<string>('');
    const [load, setLoad] = React.useState<boolean>(false);
    const [emailData, setEmailData] = React.useState<string>('')

    const createLoginRequest = () : LoginRequest => ({
        email : email.current.value,
        password : password.current.value
    })

    const handleloginSubmit = () : void => {
        setLoad(true)
        CONNECTION.login(createLoginRequest())
            .do((res : Response) => {
                if (res.success) {
                    STATE_API.setModal('topUpQr');
                    STATE_API.setAuthenticated(emailData);
                } else {
                    setError(handleErrorResponse(res.response))
                }
            })
            .subscribe (logger.rx.subscribe ("Error in register web"))
            .add(() => setLoad(false))
    }

    return (
        <div className="Login">
            <div className="login__title">Войти в личный кабинет</div>
            {!load ? 
            ( 
            <div className="login__inputs-block">
                <input required ref={email} name='email' className='login__input-email' value={emailData} onChange={(e) => setEmailData(e.target.value)}  placeholder='Эл.почта' type="text"/>
                <input required ref={password} name='password' className='login__input-password' placeholder='Пароль' type="password"/>
                <img onClick={handleloginSubmit} src={next} className='login__button-next' alt="Next"/>
                <div className="login__forgot-password" onClick={() => STATE_API.setModal('login')}>Восстановить пароль</div>
                <div className="login__to-registration" onClick={() => STATE_API.setModal('registration')}>Зарегистрироваться</div>
                <div className='login__error'>{error}</div>
            </div>
            ) 
            : 
            <Spinner />}
        </div>
    )
}
