import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { CONNECTION } from '../../../../../../Connection';
import { DeleteDeviceRequest } from '../../../../../../generated/proto.web';
import { STATE_API } from '../../../../../../redux/StateApi';
import { waitForClose, Logger } from '../../../../../../utils';

import { Button } from '../../../components/buttons/Button';

interface DeleteDeviceModel {
    deviceId? : string;
    deviceName? : string;
}
export const DeleteDevice = (props : DeleteDeviceModel) => {

    const logger = new Logger('Delete Device');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [response, setResponse] = React.useState<string>(null);

    const closeModal = () => {
        STATE_API.hideAuthWizard();
    } 

    const deleteDevice = () => {

        setInProgress(prev => prev = true)

        CONNECTION.deleteDevice(deleteDeviceRequest())
            .pipe (
                ro.tap(response => {
                
                    if (response.success) {
                        setResponse(prev => prev = `Устройство ${props.deviceName || ''} успешно удалено`)
                    }
                    else if (response.deviceNotFound) {
                        setResponse(prev => prev = `Устройство ${props.deviceName || ''} не найдено`)
                    }
                }),
                ro.delay(2000),
                ro.tap(() => closeModal()),
                ro.takeUntil(closedSubject)
            )
            .subscribe(logger.rx.subscribe('Error in deleting device'))

    }

    const deleteDeviceRequest = () : DeleteDeviceRequest => ({deviceId : props.deviceId})

    return (
        <div className="DeleteDevice" onClick={e => e.stopPropagation()}>
            <div className="title">Вы действительно хотите удалить устройство {props.deviceName}?</div>
            <Button disabled={inProgress} className='delete' text='Да' func={deleteDevice} />
            <Button disabled={inProgress} className='close' text='Нет' func={closeModal} />
            <div className="response">{response}</div>
        </div>
    )
}
