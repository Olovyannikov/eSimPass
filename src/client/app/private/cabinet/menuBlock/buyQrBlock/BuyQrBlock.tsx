import * as React from 'react';

import { Button } from '../../../../components/buttons/Button';
import bigQrActive from '../../../../../img/big-qr.png';
import relation from '../../../../../img/relation.png';

export const BuyQrBlock = () => {
    return (
        <div className="BuyQrBlock">
            <div className='buy-qr-block__qr-block'>
                <img src={bigQrActive} className='buy-qr-block__img-gr' alt="QrCode"/>
                <img src={relation} className='buy-qr-block__img_relation' alt="Connect"/>
            </div>
            <div className="buy-qr-block__qr-block_right">
                <div className="buy-qr-block__title">Купить QR-код</div>
                <div className="buy-qr-block__text">
                    Поделитесь QR кодом с друзьями и получай cashback 5% от их трат на баланс!
                    <br/>
                    После покупки QR-код с интсрукцикй появится слева. Также мы продублируем его на вашу почту.
                </div>
                <Button className='buyQr' text='Купить QR-код за 3€'/>
            </div>
        </div>
    )
}
