import * as React from 'react';
import { STATE_API } from '../../../../redux/StateApi';

import { Button } from '../../components/buttons/Button';

export const ConfirmPurchase = () => {

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const closeModal = () => STATE_API.hideAuthWizard();

    
    return (
        <div className="ConfirmPurchase" onClick={(e) => e.stopPropagation()}>
            <div className="title">Подтвердите покупку QR-кода за 3 € ?</div>
            <Button disabled={inProgress} className='yes' text='Подтверждаю' />
            <Button disabled={inProgress} className='no' text='Отмена' func={closeModal} />
        </div>
    )
}
