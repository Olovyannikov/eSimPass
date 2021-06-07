import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { CONNECTION } from '../../../../../../../../../../Connection';
import { waitForClose, Logger } from '../../../../../../../../../../utils';

import { AddDevice } from './addDevice/AddDevice';
import { Device } from './device/Device';
import { DisabledDevice } from './disabledDevice/DisabledDevice';
import { ListDevicesResponse } from '../../../../../../../../../../generated/proto.web';
import { Spinner } from '../../../../../../../../private/components/spinnerPayment/Spinner';

export const Devices = () => {

    const logger = new Logger('Packages block');

    const closedSubject = waitForClose();

    const [packages, setPackages] = React.useState<ListDevicesResponse.SuccessModel.DeviceModel[]>([]);
    const [inProgress, setInProgress] = React.useState<boolean>(true);

    React.useEffect(() => {

        CONNECTION.listDevices({})
            .pipe (
                ro.tap(response => {
                    if (response.success) {
                        setPackages(prev => prev = response.success.devices)
                    }
                    setInProgress(prev => prev = false);
                }),
                ro.takeUntil(closedSubject)
    
            )
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const doRenderFilteredDevice = () => {

        if (packages) {
            return packages.map((el, index : number) => {
                
                if (el.currentPack) {
                    return <Device device={el} key={index}/>
                } 
                else {
                    return <DisabledDevice device={el} key={index}/>
                }
            })
        }
    }

    const doRender = () => {
        if (inProgress) {
            return <Spinner />
        }
        else {
            return doRenderFilteredDevice()
        }
    }

    return (
        <div className="Devices">
            {doRender()}
            <AddDevice />
        </div>
    )
}

