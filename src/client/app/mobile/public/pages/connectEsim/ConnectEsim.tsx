import * as React from 'react';

import { Button } from '../../components/buttons/Button';
import { img_secondStep, img_stepBack } from '../../../../../resources/images';
import { useHistory } from 'react-router';

export const ConnectEsim = () => {

    const history = useHistory();

    const backToregistration = () => history.push('/registration');

    return (
        <div className="ConnectEsim">
            <div className="title">Подключение eSIM</div>
            <div className="text-step">Всего два шага для подключения</div>
            <img className='img-step' src={img_secondStep} alt="First Step"/>
            <div className="text-action">Пополните счет на 10₽</div>
            <Button className='button-buy' text='Пополнить'/>
            <img onClick={backToregistration} className='button-back' src={img_stepBack} alt="Back to register"/>
        </div>
    )
}
