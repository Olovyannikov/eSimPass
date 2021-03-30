import * as React from 'react';

import { Button } from '../../../../components/buttons/Button';
import bigQrActive from '../../../../../img/big-qr.png';
import relation from '../../../../../img/relation.png';

export const LoyaltyBlock = () => {
    return (
        <div className="LoyaltyBlock">
            <div className='loyalty-block__qr-block_left'>
                <img src={bigQrActive} className='loyalty-block__img-qr' alt="QrCode"/>
                <img src={relation} className='loyalty-block__img-relation' alt="Connect"/>
            </div>
            <div className="loyalty-block__qr-block_right">
                <div className="loyalty-block__title">Программа лояльности</div>
                <div className="loyalty-block__text">
                    Пополните баланс на 10 ₽ и получи промокод на еще один QR код бесплатно!
                    <br/>
                    После пополнения баланса <span>промокод в виде QR-кода</span> появится слева. Его неоходимо будет просканировать через приложение eSIM TRAVEL в разделе “Программа лояльности”.
                </div>
                <Button className='buyQr' text='Пополнить баланс'/>
            </div>
        </div>
    )
}
