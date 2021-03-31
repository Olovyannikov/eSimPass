import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import { useHistory } from 'react-router';
import { CONNECTION } from '../../../../../../../Connection';
import { ListDevicesResponse } from '../../../../../../../generated/proto.web';
import { STATE_API } from '../../../../../../../redux/StateApi';

import { waitForClose } from '../../../../../../../utils';

export const EmptyPackage = () => {

    const logger = new Logger('Packages block');

    const closedSubject = waitForClose();

    const history = useHistory();

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const checkExistingDevice = () => {

        CONNECTION.listDevices({})
            .do(response => {
                if (response.success.devices) {
                    history.push('/cabinet/chooseRates');
                }
                else {
                    STATE_API.showPrivateWizard('addDevice');
                    //TODO : Buy Package
                    //redirect to other page?
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

// https://toesim-dev.stand.gmdp.io/deeplink/payment/success?paymentId=1616746662254X10308
