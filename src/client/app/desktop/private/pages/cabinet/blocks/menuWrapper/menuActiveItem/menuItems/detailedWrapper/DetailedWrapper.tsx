import * as React from 'react';

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { CONNECTION } from '../../../../../../../../../../Connection';
import { waitForClose } from '../../../../../../../../../../utils';
import { Spinner } from '../../../../../../../../public/components/spinner/Spinner';
import { ListChargesRequest, ListChargesResponse } from '../../../../../../../../../../generated/proto.web';
import { Detailed } from './detailed/Detailed';
// import { mockCharges } from '../../../../../../../../../../mockData/mockCharges';

export const DetailedWrapper = () => {

    const logger = new Logger('Detailed block');

    const closedSubject = waitForClose();

    const [charges, setCharges] = React.useState<ListChargesResponse.SuccessModel.ChargeModel[]>([]);
    const [inProgress, setInProgress] = React.useState<boolean>(true);

    React.useEffect(() => {
        console.log(String(Date.parse(String(new Date()))));
        
        CONNECTION.listCharges(createListChargesRequest())
            .do(response => {
                console.log('CHARGES', response);
                
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
            value : '1618041619000'
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
