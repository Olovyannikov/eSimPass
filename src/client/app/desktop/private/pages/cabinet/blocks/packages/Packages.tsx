import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { ListDevicesResponse } from '../../../../../../../generated/proto.web';
import { EmptyPackage } from './emptyPackage/EmptyPackage';
import { CONNECTION } from '../../../../../../../Connection';
import { Spinner } from '../../../../../public/components/spinner/Spinner';
import { waitForClose, Logger } from '../../../../../../../utils';
import { PackageList } from './packageList/PackageList';

export const Packages = () => {

    const logger = new Logger('Packages block');
    
    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [packages, setPackages] = React.useState<ListDevicesResponse.SuccessModel.DeviceModel[]>([]);


    const filterActivePackages = (packages : ListDevicesResponse.SuccessModel.DeviceModel[]) => {
        if (packages) {
            return packages.filter(el => {
                if (el.currentPack) {
                    return true
                } 
                else return false
            })
        }
    }

    React.useEffect(() => {

        // STORAGE.getDevices()
        //     .concat(CONNECTION.listDevices({})
        //         .map(response => response.success.devices)
        //     )
        //     .do(devices => {
        //         if (devices) {
        //             STORAGE.storeDevices(devices)
        //         }
        //         else {
        //             STORAGE.storeDevices([])
        //         }
        //         setInProgress(prev => prev = false)
        //         setPackages(prev => prev = filterActivePackages(devices))

        //     })
        //     .takeUntil(closedSubject)
        //     .subscribe(logger.rx.subscribe('Error in device response'))


        CONNECTION.listDevices({})
            .pipe (
                ro.tap(response => {
                    if (response.success) {
                        
                        setPackages(prev => prev = filterActivePackages(response.success.devices))
                    }
                    setInProgress(prev => prev = false)
                }),
                ro.takeUntil(closedSubject)
            )
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const doRender = () => {
        if (inProgress) {
            return <Spinner />
        }
        else if (packages?.length) {                
            return <PackageList packages={packages} />
        }
        else {
            return <EmptyPackage />
        }
    }

    return (
        <div className="Packages">
            {doRender()}
        </div>
    )
}
