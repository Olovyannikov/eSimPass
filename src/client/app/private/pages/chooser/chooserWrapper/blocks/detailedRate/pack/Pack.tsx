import * as React from 'react';
import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { DetailedInfo } from './detailedInfo/DetailedInfo';

interface PackModel {
    rate : ListRatesResponse.SuccessModel.RateModel;
    pack? : ListRatesResponse.SuccessModel.RateModel.PackModel;
    typeText : string;
    static? : boolean;
}

export const Pack = (props : PackModel) => {

    return (
        <div className="Pack">
            <div className="wrapper">
                <div className="operator-name">{props.rate.operatorName}</div>
                <div className="type">{props.typeText}</div>
                <DetailedInfo pack={props.pack} static={props.static} />
            </div>
        </div>
    )
}
