import * as React from 'react';

import { STATE_API } from '../../../../redux/StateApi';
import { Button } from '../../components/buttons/Button';

export const CreateDevice = () => {

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const closeModal = () => STATE_API.hideAuthWizard();

    return (
        <div className="CreateDevice" onClick={e => e.stopPropagation()}>
            <div className="title">Cоздать новое устройство ?</div>
            <Button disabled={inProgress} className='yes' text='Да' />
            <Button disabled={inProgress} className='no' text='Нет' func={closeModal} />
        </div>
    )
}
