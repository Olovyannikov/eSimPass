import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"
import { img_pen } from '../../../../../resources/images';
import { CONNECTION } from '../../../../../Connection';
import { RenameDeviceRequest } from '../../../../../generated/proto.web';
import { Logger } from '../../../../../utils';
import { nothingToNull, waitForClose } from '../../../../../utils';

interface WhoseDeviceModel {
    name : string;
    id : string;
}

export const WhoseDevice = (props : WhoseDeviceModel) => {

    const logger = new Logger('Whose Device');

    const closedSubject = waitForClose();

    const [showInput, setShowInput] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(null);
    const [deviceName, setDeviceName] = React.useState<string>(props.name || 'Мое Устройство');
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
                <img className='pen' onClick={toggleInput} src={img_pen} alt="Pen"/>
            </>
        )
    }

    const toggleInput = () => {
        setShowInput(prev => prev = !prev)
        setError(null)
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => setDeviceName(e.target.value)

    const checkEqualsName = () => deviceName === props.name ? true : false;

    const submitChangeName = () => {

        if (nothingToNull(deviceName)) {
            
            if (checkEqualsName()) {
                handleSuccessDeviceNameChange()
            } 
            else {
                setInProgress(prev => prev = true)

                CONNECTION.renameDevice(createRenameDeviceRequest())
                    .pipe (
                        ro.tap(response => {
                            if (response.success) {
                                handleSuccessDeviceNameChange()
                            }
                            else if (response.deviceNotFound) {
                                handleDeviceNotFound()
                            }
                        }),
                        ro.takeUntil(closedSubject)
                    )
                    .subscribe(logger.rx.subscribe('Error in device response'))
            }
        }
        else {
            setPrevState()
        }
    }

    const setPrevState = () => {
        setDeviceName(prev => prev = props.name);
        setError(null);
        toggleInput();
    }

    const handleSuccessDeviceNameChange = () => {
        setInProgress(prev => prev = false);
        setShowInput(prev => prev = false);
    }

    const handleDeviceNotFound = () => {
        setError(prev => prev = 'Устройство не найдено');
        setInProgress(prev => prev = false);
        setShowInput(prev => prev = false);
        setDeviceName(prev => prev = props.name);
    }

    const createRenameDeviceRequest = () : RenameDeviceRequest => ({
        deviceId : props.id,
        name : deviceName
    })
    
    return (
        <div className="WhoseDevice">
            <div className='device'>Устройство</div>
            {doRender()}
            <div className="error">{error}</div>
        </div>
    )
}
