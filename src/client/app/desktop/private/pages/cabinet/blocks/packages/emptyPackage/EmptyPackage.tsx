import * as React from 'react';
import { useRouter } from 'next/router';
import { CONNECTION } from '../../../../../../../../Connection';
import { STATE_API } from '../../../../../../../../redux/StateApi';
import { waitForClose, Logger } from '../../../../../../../../utils';

export const EmptyPackage = () => {

    const logger = new Logger('Packages block');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const router = useRouter();

    const checkExistingDevice = () => {

        CONNECTION.listDevices({})
            .do(response => {
                if (response.success.devices) {
                    router.push('/cabinet/chooseRates');
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
            {/* <Link href='/cabinet/chooseRates'> */}
                <div className="dont-have-package" onClick={checkExistingDevice}>
                    <div className="buy-package">Купить пакет</div>
                </div>
            {/* </Link> */}
        </div>
    )
}
