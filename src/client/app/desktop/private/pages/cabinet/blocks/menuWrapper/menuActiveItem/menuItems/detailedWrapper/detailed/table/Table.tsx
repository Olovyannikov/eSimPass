/*

import * as React from 'react';
import { ListChargesResponse } from '../../../../../../../../../../../../generated/proto.web';

import { Row } from './row/Row';

interface TableModel {
    charges : ListChargesResponse.SuccessModel.ChargeModel[];
}

export const Table = (props : TableModel) => {

    const checkEmptyTable = () => {
        
        if (props.charges?.length) {
            return (
                props.charges.map((el, index : number) => (
                    <Row key={index} charge={el} />
                ))
            )
        }
        else {
            return <Row emptyRow={true}/>
        }
    }

    return (
        <div className="Table">
            {checkEmptyTable()}
        </div>
    )
}

*/
