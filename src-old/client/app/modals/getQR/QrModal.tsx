import * as React from 'react';

import first from '../../../img/first.png';
import second from '../../../img/second.png';
import next from '../../../img/next.png';

import { Button } from '../../components/buttons/Button';
import { Spinner } from '../../components/spinner/Spinner';
import { STATE_API } from '../../../redux/StateApi';

import { CONNECTION } from "./../../../Connection";
import { RegisterWebRequest, RegisterWebResponse } from '../../../../../server/container/cw2/generated/client.web';
import { Logger } from '../../../../codebase/Logger';

interface ViewData {
    titlePage?: string;
    steps?: string;
    enterEmail?: string;
    enterPassword?: string;
    img?: string;
    firstModal : boolean;
}

const texts : ViewData = {
    titlePage : 'Подключение QR кода',
    steps: 'Всего два шага до получения QR кода',
    enterEmail: 'Введите свою электронную почту, на нее мы отправим QR код \n\n Также мы создадим личный кабинет, привязанный к этой почте',
    enterPassword : 'Также мы создадим личный кабинет, привязанный к этой почте',
    img : first,
    firstModal : true
}

export const QrModal = () => {

    const logger = new Logger ("QrModal");

    const [state, setState] = React.useState<ViewData>(texts);
    const [load, setLoad] = React.useState(false);
    const [error, setError] = React.useState('');
    const [data, setData] = React.useState('');

    const email = React.useRef<HTMLInputElement>();
    const password = React.useRef<HTMLInputElement>();

    const createRegisterRequest = () : RegisterWebRequest => ({
        email : email.current.value,
        password : password.current.value
    })

    interface Response extends RegisterWebResponse {
        response? : string
    }

    const handleSubmit = () : void => {
        setLoad(true)
        CONNECTION.registerWeb (createRegisterRequest ())
            .do((res :  Response) => {
                if (res.success) {
                    setState(prev => ({
                        ...prev,
                        img : second,
                        firstModal : false,
                        enterEmail : 'Пополните Ваш баланс на 10 ₽',
                        enterPassword : '',
                    }))
                    STATE_API.setAuthenticated(data)
                    setError('')
                } else {
                    setError(res.response)
                }
            })
            .subscribe (logger.rx.subscribe ("Error in register web"))
            .add(() => setLoad(false))
    }

    return (
        <div className='QrModal'>
            <div className="title">{state.titlePage}</div>
            <div className="text">{state.steps}</div>
            <img className='first' src={state.img} alt="First Step"/>
            <div className="text">
                {state.enterEmail}
            </div>
            {state.firstModal ?  ( !load ? (
                <div className="inputsBlock">
                    <input required ref={email} name='email' className='email' value={data} onChange={(e) => setData(e.target.value)} placeholder='Эл.почта' type="text"/>
                    <input required ref={password} name='password' className='password' placeholder='Пароль' type="password"/>
                    <img onClick={handleSubmit} src={next} className='next' alt="Next"/>
                    <div className='error'>{error}</div>
                </div>
            ) : <Spinner />) 
            :  
            <Button className="supplementQr" text='Пополнить' />}
        </div>
    )
}



