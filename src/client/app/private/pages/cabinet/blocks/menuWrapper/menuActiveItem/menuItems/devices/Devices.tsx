import * as React from 'react';
import * as rx from 'rxjs/Rx';

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { CONNECTION } from '../../../../../../../../../Connection';
import { devicesData } from '../../../../../../../../../mockData/mockDevices';
import { waitForClose } from '../../../../../../../../../utils';

import { AddDevice } from './addDevice/AddDevice';
import { Device } from './device/Device';
import { DisabledDevice } from './disabledDevice/DisabledDevice';
import { ListDevicesResponse } from '../../../../../../../../../generated/proto.web';

export const Devices = () => {

    const logger = new Logger('Packages block');

    const closedSubject = waitForClose();

    const [packages, setPackages] = React.useState<ListDevicesResponse.SuccessModel.DeviceModel[]>(devicesData);

    React.useEffect(() => {

        CONNECTION.listDevices({})

            .do(response => {
                if (response.success) {
                    // setPackages(prev => prev = filterActivePackages(devicesData))
                }
                // setInProgress(prev => prev = false)
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const doRenderFilteredDevice = () => {

        return packages.map((el, index : number) => {
            
            if (Object.keys(el.currentPack).length !== 0) {
                return <Device device={el} key={index}/>
            } 
            else {
                return <DisabledDevice device={el} key={index}/>
            }
        })
    }

    return (
        <div className="Devices">
            {doRenderFilteredDevice()}
            <AddDevice />
        </div>
    )
}
