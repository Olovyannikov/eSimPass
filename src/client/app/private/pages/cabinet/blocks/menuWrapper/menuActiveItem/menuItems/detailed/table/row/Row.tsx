import * as React from 'react';
import { ListChargesResponse } from '../../../../../../../../../../../generated/proto.web';

interface RowModel {
    charge : ListChargesResponse.SuccessModel.ChargeModel
}

export const Row = (props : RowModel) => {

    return (
        <div className="Row">
            <span className="date">{props.charge.date}</span>
            <span className="who">Имя девайса</span>
            {/* <span className="rate">{chargesUnit?.quota} {chargesUnit?.unit} по тарифу <span>Имя тарифа</span></span> */}
            <span className="price">- {props.charge.total} €</span>
        </div>
    )
}
