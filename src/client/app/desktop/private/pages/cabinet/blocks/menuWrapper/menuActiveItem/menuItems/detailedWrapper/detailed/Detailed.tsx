import * as React from 'react';

import { Header } from './header/Header';
import { Table } from './table/Table';
import { ListChargesResponse } from '../../../../../../../../../../../generated/proto.web';
import { Footer } from './footer/Footer';

export interface DetailedModel {
    charges : ListChargesResponse.SuccessModel.ChargeModel[];
}

export type TableView = 'expenses' | 'payments';

export const Detailed = (props : DetailedModel) => {

    const [tableView, setTableView] = React.useState<TableView>('expenses');
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    const filterChargesByTableView = () => {
        if (tableView === 'payments') {
            return props.charges.filter(el => el.type.addBalance)
        }
        else return props.charges.filter(el => !el.type.addBalance)
    }

    const reduceChargesByPages = () => {
        
        const filteredCharges = filterChargesByTableView();
        const pageSize : number = 15;
        if (filteredCharges) {
            return filteredCharges.reduce((result : ListChargesResponse.SuccessModel.ChargeModel[][], item, index) => {
                const chunkIndex = Math.floor(index / pageSize)

                if (!result[chunkIndex]) {
                    result[chunkIndex] = []
                }
                result[chunkIndex].push(item)

                return result
            }, [])
        }
    }

    return (
        <div className="Detailed">
            <Header allPages={reduceChargesByPages().length} currentPage={currentPage} setCurrentPage={setCurrentPage} togglePage={setTableView} tableView={tableView} /> 
            <Table charges={reduceChargesByPages()[currentPage]} />
            <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} allPage={reduceChargesByPages().length} />
        </div>
    )
}

