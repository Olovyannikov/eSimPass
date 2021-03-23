import * as React from 'react';

import { Header } from './header/Header';
import { Table } from './table/Table';
import { ListChargesResponse } from '../../../../../../../../../../generated/proto.web';
import { Footer } from './footer/Footer';

export interface DetailedModel {
    charges : ListChargesResponse.SuccessModel.ChargeModel[];
}

export type TableView = 'expenses' | 'payments';

export const Detailed = (props : DetailedModel) => {

    const [tableView, setTableView] = React.useState<TableView>('expenses');
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    const filterChargesByTableView = (tableView : TableView) => {
        if (tableView === 'expenses') {
            return props.charges.filter(el => el.type === ListChargesResponse.SuccessModel.ChargeModel.CHARGE_TYPE.PACK_BOUGHT)
        }
        else return props.charges.filter(el => el.type === ListChargesResponse.SuccessModel.ChargeModel.CHARGE_TYPE.ADD_FUNDS)
    }

    return (
        <div className="Detailed">
            <Header allPages={filterChargesByTableView(tableView).length} currentPage={currentPage} togglePage={setTableView} tableView={tableView} /> 
            <Table charges={filterChargesByTableView(tableView)} />
            <Footer />
        </div>
    )
}
