import * as React from 'react';

import { img_pen } from '../../../../resources/images';
import { CONNECTION } from '../../../../Connection';
import { RenameDeviceRequest } from '../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../utils';

interface WhoseDeviceModel {
    name : string;
    id : string;
}

export const WhoseDevice = (props : WhoseDeviceModel) => {

    const logger = new Logger('Whose Device');

    const closedSubject = waitForClose();

    const [showInput, setShowInput] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(null);
    const [deviceName, setDeviceName] = React.useState<string>(props.name);
    const [inProgress, setInProgress] = React.useState<boolean>(false)

    const doRender = () => {
        if (showInput) {
            return (
                <>
                    <input disabled={inProgress}  value={deviceName} onChange={handleInputChange}  placeholder={deviceName} type="text" className='whose-device'/>
                    <img className='pen' onClick={submitChangeName} src={img_pen} alt="Pen"/>
                </>
            )
        } 
        else return (
            <>
                <div className="whose-name">{deviceName}</div>
                <img className='pen' onClick={handleInputState} src={img_pen} alt="Pen"/>
            </>
        )
    }

    const handleInputState = () => {
        setShowInput(prev => prev = true)
        setError(null)
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDeviceName(prev => prev = e.target.value)
    }

    const checkEqualsName = () => deviceName === props.name ? true : false;

    const submitChangeName = () => {

        setInProgress(prev => prev = true)

        if (checkEqualsName()) {
            handleSuccessDeviceNameChange()
        } 
        else {
            CONNECTION.renameDevice(createRenameDeviceRequest())
                .do(response => {
                    if (response) {
                        handleSuccessDeviceNameChange()
                    }
                    else if (response.deviceNotFound) {
                        handleDeviceNotFound()
                    }
                })
                .takeUntil(closedSubject)
                .subscribe(logger.rx.subscribe('Error in device response'))

        }

    }

    const handleSuccessDeviceNameChange = () => {
        setInProgress(prev => prev = false);
        setShowInput(prev => prev = false);
    }

    const handleDeviceNotFound = () => {
        setError(prev => prev = 'Устройство не найдено');
        setInProgress(prev => prev = false);
        setShowInput(prev => prev = false)
        setDeviceName(prev => prev = props.name)
    }

    const createRenameDeviceRequest = () : RenameDeviceRequest => ({
        deviceId : props.id,
        name : props.name
    })
    
    return (
        <div className="WhoseDevice">
            <div className='device'>Устройство</div>
            {doRender()}
            <div className="error">{error}</div>
        </div>
    )
}
