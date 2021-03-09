import * as React from 'react';
import { countUnit, ICountUnit } from '../../../../../../../../codebase/utils';
import { ListChargesResponse } from '../../../../../../../../generated/proto.web';


interface IColumn {
    charge : ListChargesResponse.SuccessModel.ChargeModel
}

export const Column = ({charge} : IColumn) => {

    const [chargesUnit, setChargesUnit] = React.useState<ICountUnit>({})

    React.useEffect(() => {
        setChargesUnit(countUnit(Number(charge.bytes.value)))
    },[charge])


    return (
        <div className="Column">
            <span className="column__date">{charge.date}</span>
            <span className="column__who">Имя девайса</span>
            <span className="column__rate">{chargesUnit?.quota} {chargesUnit?.unit} по тарифу <span>Имя тарифа</span></span>
            <span className="column__price">- {charge.total} €</span>
        </div>
    )
}
