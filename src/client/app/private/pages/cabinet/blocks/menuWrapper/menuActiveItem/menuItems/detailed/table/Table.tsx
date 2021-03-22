import * as React from 'react';
import { ListChargesResponse } from '../../../../../../../../../../generated/proto.web';

import { Row } from './row/Row';

interface TableModel {
    charges : ListChargesResponse.SuccessModel.ChargeModel[];
}

export const Table = (props : TableModel) => {
    return (
        <div className="Table">
            {props.charges && props.charges.map((el, index : number) => (
                <Row key={index} charge={el} />
            ))}
        </div>
    )
}
