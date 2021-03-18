import * as React from 'react';

import { img_relation, img_bigQrActive } from '../../../../../../../../../resources/images';
import { Button } from '../../../../../../../components/buttons/Button';

export const BuyQrCode = () => {
    return (
        <div className="BuyQrCode">
            <div className='qr-block'>
                <img src={img_bigQrActive} className='img-gr' alt="QrCode"/>
                <img src={img_relation} className='img_relation' alt="Connect"/>
            </div>
            <div className="qr-block_right">
                <div className="title">Купить QR-код</div>
                <div className="text">
                    Поделитесь QR кодом с друзьями и получай cashback 5% от их трат на баланс!
                    <br/>
                    После покупки QR-код с интсрукцикй появится слева. Также мы продублируем его на вашу почту.
                </div>
                <Button className='buyQr' text='Купить QR-код'/>
            </div>
        </div>
    )
}
