import * as React from 'react';
import * as rx from "rxjs/Rx"

import { ListDevicesResponse } from '../../../../../../generated/proto.web';
import { ActivePackage } from './activePackage/ActivePackage';
import { EmptyPackage } from './emptyPackage/EmptyPackage';
import { devicesData } from '../../../../../../mockData/mockDevices';
import { CONNECTION } from '../../../../../../Connection';
import { PACKAGES } from '../../../../../../PackageAdapter';
import { Spinner } from '../../../../../public/components/spinner/Spinner';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../utils';

export const Packages = () => {

    const logger = new Logger('Packages block');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [packages, setPackages] = React.useState<ListDevicesResponse.SuccessModel.DeviceModel[]>([])

    React.useEffect(() => {

        getListDevicesResponse()
            .do(response => {
                if (response.success) {
                    handleSuccessResponse()
                }
                else {
                    setInProgress(prev => prev = false)
                }
                
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const getListDevicesResponse = () => CONNECTION.listDevices({})

    const handleSuccessResponse = () => {
        PACKAGES.setActivePackage(devicesData)
        setPackages(prev => prev = PACKAGES.getActivePackages())
        setInProgress(prev => prev = false)
    }

    const showPackages = () => {
        if (inProgress) {
            return <Spinner />
        }
        else {
            if (packages.length) {
                
                return (
                    <>
                        <div className="title-active">Активные пакеты</div>
                        {packages.map((el, index : number) => (
                            <ActivePackage package={el} key={index} />
                        ))}
                    </>
                )
            }
            else {
                return <EmptyPackage />
            }

        }
    }

    return (
        <div className="Packages">
            {showPackages()}
        </div>
    )
}
