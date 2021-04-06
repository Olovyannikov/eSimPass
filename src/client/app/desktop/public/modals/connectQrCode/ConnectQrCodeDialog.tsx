import * as React from 'react';

import { img_secondStep } from '../../../../../resources/images';
import { Button } from '../../../private/components/buttons/Button';

export const ConnectQrCodeDialog = () => {

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    return (
        <div className="ConnectQrCodeDialog" onClick={(e) => e.stopPropagation()}>
            <div className="title">Подключение QR-кода</div>
            <div className="text-step">Последний шаг для подключения</div>
            <img className='img-step' src={img_secondStep} alt="First Step"/>
            <div className="text-action">Пополните Ваш баланс на 10₽</div>
            <Button text='Пополнить' className='button-topup' />
        </div>
    )
}
