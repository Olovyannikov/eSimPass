import * as React from 'react';

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { CONNECTION } from '../../../../../../../../../Connection';
import { waitForClose } from '../../../../../../../../../utils';
import { Spinner } from '../../../../../../../../public/components/spinner/Spinner';
import { ListChargesRequest, ListChargesResponse } from '../../../../../../../../../generated/proto.web';
import { Detailed } from './detailed/Detailed';

export const DetailedWrapper = () => {

    const logger = new Logger('Detailed block');

    const closedSubject = waitForClose();

    const [charges, setCharges] = React.useState<ListChargesResponse.SuccessModel.ChargeModel[]>([]);
    const [inProgress, setInProgress] = React.useState<boolean>(true);

    React.useEffect(() => {

        CONNECTION.listCharges(createListChargesRequest())
            .do(response => {
                if (response.success) {
                    handleSuccessResponse(response)
                }
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in charges response'))
            
    }, [])

    const handleSuccessResponse = (response : ListChargesResponse) => {
        setCharges(prev => prev = response.success.charges)
        setInProgress(prev => prev = false)
    }

    const createListChargesRequest = () : ListChargesRequest => ({
        fromDate : {
            value : 'some date'
        }
    })

    const doRender = () => {
        if (inProgress) {
            return <Spinner />
        }
        else {
            return <Detailed charges={charges}/> 
        }
    }

    return (
        <div className="DetailedWrapper">
            {doRender()}
        </div>
    )
}