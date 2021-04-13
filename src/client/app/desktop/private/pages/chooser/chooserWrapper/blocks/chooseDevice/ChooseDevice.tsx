import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import { CONNECTION } from '../../../../../../../../Connection';
import { ListDevicesResponse, ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { STATE_API } from '../../../../../../../../redux/StateApi';
import { STORAGE } from '../../../../../../../../StorageAdapter';
import { waitForClose } from '../../../../../../../../utils';
import { Spinner } from '../../../../../components/spinnerPayment/Spinner';
import { AddDevice } from './addDevice/AddDevice';
import { Device } from './device/Device';
import { DisabledDevice } from './disabledDevice/DisabledDevice';

interface ChooseDeviceModel {
    rate? : ListRatesResponse.SuccessModel.RateModel;
    pack? : ListRatesResponse.SuccessModel.RateModel.PackModel;
}

export const ChooseDevice = (props : ChooseDeviceModel) => {

    const logger = new Logger('Choose Device block');

    const closedSubject = waitForClose();

    const [packages, setPackages] = React.useState<ListDevicesResponse.SuccessModel.DeviceModel[]>([]);
    const [inProgress, setInProgress] = React.useState<boolean>(true);

    React.useEffect(() => {

        // CONNECTION.listDevices({})
        //     .do(response => {
        //         if (response.success) {
        //             setPackages(prev => prev = response.success.devices)
        //         }
        //         setInProgress(prev => prev = false);
        //     })
        //     .takeUntil(closedSubject)
        //     .subscribe(logger.rx.subscribe('Error in device response'))

        STORAGE.getDevices()
            .concat(CONNECTION.listDevices({})
                .map(response => response.success.devices)
            )
            .do(devices => {
                if (devices) {
                    STORAGE.storeDevices(devices)
                }
                else {
                    STORAGE.storeDevices([])
                }
                setInProgress(prev => prev = false)
                setPackages(prev => prev = devices)

            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const doRenderFilteredDevice = () => {

        if (packages) {
            return packages.map((el, index : number) => {
                
                if (el.currentPack) {
                    return <Device pack={props.pack} rateId={props.rate.rateId} device={el} key={index}/>
                } 
                else {
                    return <DisabledDevice pack={props.pack} rateId={props.rate.rateId} device={el} key={index}/>
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
        <div className="ChooseDevice">
            <div className="title">Выберите устройства для подключения тарифа {props.rate.operatorName} </div>
            {doRender()}
            <AddDevice />
        </div>
    )
}
