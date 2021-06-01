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
        
        setInProgress(prev => prev = true)

        CONNECTION.listDevices({})
            .do(response => {
                if (response.success.devices) {
                    router.push('/cabinet/chooseRates');
                }
                else {
                    setInProgress(false)
                    STATE_API.showPrivateWizard('addDevice');
                    //TODO : add disabled block
                }
                
            })
            // .do(() => setInProgress(prev => prev = false))
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))
        
    }

    return (
        <div className={`EmptyPackage ${inProgress ? 'disabled' : ''}`}>
            <div className="dont-have-package" onClick={checkExistingDevice}>
                <div className="buy-package">Купить пакет</div>
            </div>
        </div>
    )
}
