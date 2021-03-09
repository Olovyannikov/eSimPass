import * as React from 'react';

import { TablePages } from './tablePages/TablePages';
import { TableBlock } from './tableBlock/TableBlock';
import { TogglerTable } from './togglerTable/TogglerTable';
import { DetailAndNavigation } from './detailAndNavigation/DetailAndNavigation';
import { ListChargesResponse } from '../../../../../../generated/proto.web';

interface IPaymentsBlock {
    listCharges : ListChargesResponse.SuccessModel.ChargeModel[]
}

interface ITableField {
    array? : ListChargesResponse.SuccessModel.ChargeModel[];
    length? : number;
}

interface ITableData {
    expenses? : ITableField;
    payments? : ITableField;
}

export type TableType = 'expenses' | 'payments'

export const PaymentsBlock = ({ listCharges } : IPaymentsBlock) => {

    const [tableType, setTableType] = React.useState<TableType>('expenses');
    const [tableData, setTableData] = React.useState<ITableData>({});
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    const filterListCharges = (listCharges : ListChargesResponse.SuccessModel.ChargeModel[], type : 'ADD_FUNDS' | 'PACK_BOUGHT') => {
        return listCharges.filter(el => el.type === type)
    }

    const divideFilteredChargesByFiveItem = (listCharges : ListChargesResponse.SuccessModel.ChargeModel[]) : ITableField => {
        const arraysByFiveCharges :  ListChargesResponse.SuccessModel.ChargeModel[][] = []
        const arraySize = 5;
        for (let i = 0; i < Math.ceil(listCharges.length / arraySize); i++) {
            arraysByFiveCharges[i] = listCharges.slice((i * arraySize), (i * arraySize) + arraySize)
        }
        return {
            array : arraysByFiveCharges[currentPage],
            length : arraysByFiveCharges.length
        }
    }

    React.useEffect(() => {
        setTableData(prev => ({
        ...prev,
        expenses: divideFilteredChargesByFiveItem(filterListCharges(listCharges, 'PACK_BOUGHT')),
        payments : divideFilteredChargesByFiveItem(filterListCharges(listCharges, 'ADD_FUNDS'))
    }))},[currentPage])

    const toggleTable = () => {
        setCurrentPage(prev => prev = 0)
        return tableType === 'expenses' ? setTableType('payments') : setTableType('expenses');
    }

    const checkTypeTable = (type : TableType, key : string) => {
        if (type === 'expenses') {
            return tableData.expenses?.[key];
        } else if (type === 'payments') {
            return tableData.payments?.[key];
        }
    }


    return (
        <div className="PaymentsBlock">
            <div className='table-pages'>{currentPage + 1} / {checkTypeTable(tableType, 'length')}</div>
            <TogglerTable toggle={toggleTable} table={tableType} />
            <TableBlock type={tableType} charges={checkTypeTable(tableType, 'array')} />
            <DetailAndNavigation setCurrentPage={setCurrentPage} currentPage={currentPage} allPage={checkTypeTable(tableType, 'length')} />
        </div>
    )
}

