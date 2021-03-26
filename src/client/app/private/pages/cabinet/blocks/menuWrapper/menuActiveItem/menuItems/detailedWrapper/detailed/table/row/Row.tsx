import * as React from 'react';

import { unitConventer, ConventerUnitModel } from '../../../../../../../../../../../../utils';
import { ListChargesResponse } from '../../../../../../../../../../../../generated/proto.web';

interface RowModel {
    charge? : ListChargesResponse.SuccessModel.ChargeModel;
    emptyRow? : boolean;
}

export const Row = (props : RowModel) => {

    const [chargesUnit, setChargesUnit] = React.useState<ConventerUnitModel>({});

    const convertMsToLocalDate = (date : string) => new Date(+date).toLocaleString().replace(',', ' в'); 

    React.useEffect(() => {
        //TODO: fix charges conventer
        if (props.charge?.bytes) {
            setChargesUnit(unitConventer(+props.charge.bytes.value, +props.charge.total))
        }
        else {
            setChargesUnit(unitConventer(0, +props.charge?.total || 0))
        }
    }, [])

    const renderChargesByType = () => {
        

        if (props.charge.type === ListChargesResponse.SuccessModel.ChargeModel.CHARGE_TYPE.PACK_BOUGHT) {


            return (
                <>
                    <span className="rate">{chargesUnit?.quota} {chargesUnit?.unit} по тарифу <span>Имя тарифа</span></span>
                    <span className="who">Имя девайса</span>
                </>
            )
        }
        else {
            return (
                <>
                    <span className='top-up'>Пополнение</span>
                    <span className='successful-top-up'>Платеж внесен</span>
                </>
            )
        }
    }

    const doRender = () => {

        if (props.emptyRow) {
            return <div className="empty-row">Транзакции отсутствуют</div>
        }

        else {

            return (
                <>
                    <span className="date">{convertMsToLocalDate(props.charge.date)}</span>
                    {renderChargesByType()}
                    <span className="price"> {props.charge.total} €</span>
                </>
            )
        }
    }

    return (
        <div className="Row">
            {doRender()}
        </div>
    )
}
