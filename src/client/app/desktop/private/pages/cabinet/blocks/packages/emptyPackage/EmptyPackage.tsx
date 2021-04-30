import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import Router from 'next/router';
import { CONNECTION } from '../../../../../../../../Connection';
import { STATE_API } from '../../../../../../../../redux/StateApi';

import { waitForClose } from '../../../../../../../../utils';

export const EmptyPackage = () => {

    const logger = new Logger('Packages block');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const checkExistingDevice = () => {

        CONNECTION.listDevices({})
            .do(response => {
                if (response.success.devices) {
                    Router.push('/cabinet/chooseRates');
                }
                else {
                    STATE_API.showPrivateWizard('addDevice');
                    //TODO : add disabled block
                }
                setInProgress(prev => prev = false);
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))
        
    }

    return (
        <div className="EmptyPackage">
            <div className="dont-have-package" onClick={checkExistingDevice}>
                <div className="buy-package">Купить пакет</div>
            </div>
        </div>
    )
}
