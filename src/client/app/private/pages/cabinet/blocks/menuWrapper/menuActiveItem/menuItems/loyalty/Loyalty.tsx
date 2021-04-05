import * as React from 'react';

import { Button } from '../../../../../../../components/buttons/Button';
import { img_relation, img_bigQrActive, img_hiddenQr, img_yellowBlock } from '../../../../../../../../../resources/images';

export const Loyalty = () => {

    return (
        // <div className="Loyalty">
        //     <div className="title">Скоро появится!</div>
        // </div>
        <div className="Loyalty">
            <div className='left-block'>
                <img src={img_hiddenQr} className='img-qr' alt="QrCode"/>
                <img src={img_yellowBlock} className='yellow-block' />
                <img src={img_relation} className='img-relation' alt="Connect"/>
            </div>
            <div className="right-block">
                <div className="title">Скоро появится!</div>
                {/* <div className="text">
                    Пополните баланс на 10 ₽ и получи промокод на еще один QR код бесплатно!
                    <br/>
                    После пополнения баланса <span>промокод в виде QR-кода</span> появится слева. Его неоходимо будет просканировать через приложение eSIM TRAVEL в разделе “Программа лояльности”.
                </div>
                <Button className='buyQr' text='Пополнить баланс'/> */}
            </div>
        </div>
    )
}
