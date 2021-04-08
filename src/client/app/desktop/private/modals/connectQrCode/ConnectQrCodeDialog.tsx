import * as React from 'react';
import { STATE_API } from '../../../../../redux/StateApi';

import { img_secondStep, img_crossMobile } from '../../../../../resources/images';
import { Button } from '../../components/buttons/Button';

export const ConnectQrCodeDialog = () => {

    const closeModal = () => STATE_API.hideAuthWizard()

    const buyQrCode = () => STATE_API.showPrivateWizard('buyQrCode')

    return (
        <div className="ConnectQrCodeDialog" onClick={(e) => e.stopPropagation()}>
            <img onClick={closeModal} className='close' src={img_crossMobile} alt="Close"/>
            <div className="title">Подключение QR-кода</div>
            <div className="text-step">Последний шаг для подключения</div>
            <img className='img-step' src={img_secondStep} alt="First Step"/>
            <div className="text-action">Пополните Ваш баланс на 10₽</div>
            <Button func={buyQrCode} text='Пополнить' className='button-topup' />
        </div>
    )
}
