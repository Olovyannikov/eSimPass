import * as React from 'react';

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { CONNECTION } from '../../../../../../../../../Connection';
import { waitForClose } from '../../../../../../../../../utils';
import { DetailedHeader } from './detailedHeader/DetailedHeader';
import { Table } from './table/Table';
import { Spinner } from '../../../../../../../../public/components/spinner/Spinner';
import { ListChargesRequest, ListChargesResponse } from '../../../../../../../../../generated/proto.web';

export type TableView = 'expenses' | 'payments';

export const Detailed = () => {

    const logger = new Logger('Packages block');

    const closedSubject = waitForClose();

    const [tableView, setTableView] = React.useState<TableView>('expenses');
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [charges, setCharges] = React.useState<ListChargesResponse.SuccessModel.ChargeModel[]>([]);
    const [inProgress, setInProgress] = React.useState<boolean>(true)

    React.useEffect(() => {


        CONNECTION.listCharges(createListChargesRequest())
            .do(response => {
                if (response.success) {
                    setCharges(prev => prev = response.success.charges)
                    setInProgress(prev => prev = false)
                }
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in dcharges response'))

    }, [])

    const createListChargesRequest = () : ListChargesRequest => ({
        fromDate : {
            value : 'some data'
        }
    })

    const doRender = () => {
        if (inProgress) {
            return <Spinner />
        }
        else {
            return (
                <>
                    <DetailedHeader allPages={charges.length} currentPage={currentPage} togglePage={setTableView} tableView={tableView} /> 
                    <Table charges={charges} />
                </>
            )
        }
    }

    return (
        <div className="Detailed">
            {doRender()}
        </div>
    )
}
