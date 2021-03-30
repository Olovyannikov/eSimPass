import * as React from 'react';
import { closeModal } from '../../../codebase/utils';

import second from '../../../img/second.png';
import { Button } from '../../components/buttons/Button';

import { ConnectQrCode } from '../../components/connectQrCode/ConnectQrCode';

export const TopUpQr = () => {
    return (
        <div className="TopUpQr">
            <ConnectQrCode stepImg={second} actionText='Пополните Ваш баланс на 10₽' />
            <Button func={() => closeModal()} className="supplementQr" text='Пополнить' />
        </div>
    )
}
