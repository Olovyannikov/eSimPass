import * as React from 'react';

import first from '../../../img/first.png';
import next from '../../../img/next.png';

import { ConnectQrCode } from '../../components/connectQrCode/ConnectQrCode';
import { CONNECTION } from "./../../../Connection";
import { STATE_API } from '../../../redux/StateApi';
import { Spinner } from '../../components/spinner/Spinner';
import { RegisterWebRequest, RegisterWebResponse } from '../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase/client/Logger';
import { handleErrorResponse } from '../../../codebase/utils';


const actionText = 'Введите свою электронную почту, на нее мы отправми QR-код \n\n Также мы создадим личный кабинет, привязанный к этой почте';

interface Response extends RegisterWebResponse {
    response? : string
}

export const Registration = () => {

    const logger = new Logger ("Registration");

    const email = React.useRef<HTMLInputElement>();
    const password = React.useRef<HTMLInputElement>();

    const [error, setError] = React.useState<string>('');
    const [load, setLoad] = React.useState<boolean>(false);
    const [emailData, setEmailData] = React.useState<string>('')

    const createRegisterRequest = () : RegisterWebRequest => ({
        email : email.current.value,
        password : password.current.value
    })

    const handleRegistrationSubmit = () : void => {
        setLoad(true)
        CONNECTION.registerWeb(createRegisterRequest())
            .do((res : Response) => {
                if (res.success) {
                    STATE_API.setModal('topUpQr');
                    STATE_API.setAuthenticated(emailData);
                } else {
                    setError(handleErrorResponse(res.response))
                    setLoad(false)
                }
            })
            .subscribe (logger.rx.subscribe ("Error in register web"))
    }
    

    return (
        <div className="Registration">
            <ConnectQrCode stepImg={first} actionText={actionText} />
            {!load ? 
            ( 
            <div className="registration__inputs-block">
                <input required ref={email} name='email' className='registration__input-email' value={emailData} onChange={(e) => setEmailData(e.target.value)}  placeholder='Эл.почта' type="text"/>
                <input required ref={password} name='password' className='registration__input-password' placeholder='Пароль' type="password"/>
                <img onClick={handleRegistrationSubmit} src={next} className='registration__button-next' alt="Next"/>
                <div className="registration__already-abonent" onClick={() => STATE_API.setModal('login')}>Уже являюсь клиентом</div>
                <div className='registration__error'>{error}</div>
            </div>
            ) 
            : 
            <Spinner />}
        </div>
    )
}
