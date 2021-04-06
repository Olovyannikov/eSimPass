import * as React from 'react';

import { Pack } from '../../../../../../private/pages/chooser/chooserWrapper/blocks/detailedRate/pack/Pack';
import { ListRatesResponse } from '../../../../../../../generated/proto.web';

interface RateModel {
    rate : ListRatesResponse.SuccessModel.RateModel
}

export const Rate = (props : RateModel) => {
    
    return (
        <div className="Rate">
            {props.rate.packs.map((el, index) => (
                <Pack key={index} typeText='Пакетный тариф' pack={el} rate={props.rate} />
            ))}
        </div>
    )
}
