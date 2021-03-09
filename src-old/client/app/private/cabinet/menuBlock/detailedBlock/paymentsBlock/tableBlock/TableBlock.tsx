import * as React from 'react';
import { ListChargesResponse } from '../../../../../../../generated/proto.web';

import { TableType } from '../PaymentsBlock';
import { Column } from './column/Column';

interface ITableBlock {
    charges : ListChargesResponse.SuccessModel.ChargeModel[];
    type : TableType
}

export const TableBlock = ({charges} : ITableBlock) => {

    return (
        <div className="TableBlock">
            {charges && charges.map((el, index : number) => (
                <Column key={index} charge={el} />
            ))}
        </div>
    )
}
