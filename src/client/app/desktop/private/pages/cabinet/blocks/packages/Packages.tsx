import * as React from 'react';
import * as rx from "rxjs/Rx"

import { ListDevicesResponse } from '../../../../../../../generated/proto.web';
import { EmptyPackage } from './emptyPackage/EmptyPackage';
import { CONNECTION } from '../../../../../../../Connection';
import { Spinner } from '../../../../../public/components/spinner/Spinner';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../../utils';
import { PackageList } from './packageList/PackageList';
import { devicesData } from '../../../../../../../mockData/mockDevices';

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

        CONNECTION.listDevices({})

            .do(response => {
                if (response.success) {
                    setPackages(prev => prev = filterActivePackages(response.success.devices))
                }
                setInProgress(prev => prev = false)
            })
            .takeUntil(closedSubject)
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
