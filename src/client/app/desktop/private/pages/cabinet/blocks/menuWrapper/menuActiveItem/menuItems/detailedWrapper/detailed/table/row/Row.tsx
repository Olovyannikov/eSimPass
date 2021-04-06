import * as React from 'react';

import { unitConventer, ConventerUnitModel } from '../../../../../../../../../../../../../utils';
import { ListChargesResponse } from '../../../../../../../../../../../../../generated/proto.web';

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
            setChargesUnit(prev => prev = unitConventer(+props.charge.bytes.value, +props.charge.total))
        }
        else {
            setChargesUnit(prev => prev = unitConventer(0, +props.charge?.total || 0))
        }
        
    }, [])

    const renderChargesByType = () => {
        console.log(props.charge);
        
        console.log(chargesUnit);
        
        if (props.charge.type === ListChargesResponse.SuccessModel.ChargeModel.CHARGE_TYPE.PACK_BOUGHT) {

            return (
                <>
                    <span className="who">Имя девайса</span>
                    <span className="rate">{chargesUnit?.used} {chargesUnit?.unit} по тарифу <span>Имя тарифа</span></span>
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
                    <span className="price"> {props.charge.total} ₽</span>
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