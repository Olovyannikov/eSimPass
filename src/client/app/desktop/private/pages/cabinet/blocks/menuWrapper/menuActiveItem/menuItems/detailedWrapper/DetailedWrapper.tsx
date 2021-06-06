import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { CONNECTION } from '../../../../../../../../../../Connection';
import { waitForClose, Logger } from '../../../../../../../../../../utils';
import { Spinner } from '../../../../../../../../public/components/spinner/Spinner';
import { ListChargesRequest, ListChargesResponse } from '../../../../../../../../../../generated/proto.web';
import { Detailed } from './detailed/Detailed';

export const DetailedWrapper = () => {

    const logger = new Logger('Detailed block');

    const closedSubject = waitForClose();

    const [charges, setCharges] = React.useState<ListChargesResponse.SuccessModel.ChargeModel[]>([]);
    const [inProgress, setInProgress] = React.useState<boolean>(true);

    React.useEffect(() => {
        
        CONNECTION.listCharges(createListChargesRequest())
            .pipe (
                ro.tap(response => {
                
                    if (response.success) {
                        handleSuccessResponse(response)
                    }
    
                }),
                ro.takeUntil(closedSubject)                    
            )
            .subscribe(logger.rx.subscribe('Error in charges response'))
            
    }, [])

    const handleSuccessResponse = (response : ListChargesResponse) => {
        setCharges(prev => prev = response.success.charges)
        setInProgress(prev => prev = false)
    }
    // TODO DATE CONVENTER 
    const createListChargesRequest = () : ListChargesRequest => ({
        fromDate : {
            value : null
        }
    })

    const doRender = () => {
        if (inProgress) {
            return <Spinner />
        }
        else if (charges) {
            return <Detailed charges={charges} /> 
        }
        else {
            return <div className="empty-charges">Транзакции отсутствуют</div>
        }
    }

    return (
        <div className="DetailedWrapper">
            {doRender()}
        </div>
    )
}
