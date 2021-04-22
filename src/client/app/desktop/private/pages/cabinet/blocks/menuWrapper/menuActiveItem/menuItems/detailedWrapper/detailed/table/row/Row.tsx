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
        if (props.charge) {

            if (props.charge.type?.dataUsedFromBalance?.bytes) {
                console.log(props.charge.type.dataUsedFromBalance.bytes);
                
                setChargesUnit(prev => prev = unitConventer(+props.charge.type.dataUsedFromBalance.bytes))
            }
        }
        
    }, [])

    const renderChargesByType = () => {
        
        if (props.charge.type?.boughtRoamingPack) {

            return (
                <>
                    <span className="who">{props.charge.type.boughtRoamingPack?.deviceName?.value || 'Мое устройсто'}</span>
                    <span className="rate"> Покупка тарифа  <span> {props.charge.type.boughtRoamingPack.operatorName}</span></span>
                </>
            )
        }
        else if (props.charge.type?.dataUsedFromBalance) {
            return (
                <>
                    <span className="who">{props.charge.type.dataUsedFromBalance?.deviceName?.value || 'Мое устройсто'}</span>
                    <span className="rate">{chargesUnit?.quota} {chargesUnit?.unit} по тарифу <span>{props.charge.type.dataUsedFromBalance.operatorName}</span></span>
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
