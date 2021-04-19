import * as React from 'react';
import { ListRatesResponse } from '../../../../../../../../../../../../generated/proto.web';
import { unitConventer } from '../../../../../../../../../../../../utils';


export const PackItem = (props : {
    pack : ListRatesResponse.SuccessModel.RateModel.PackModel
}) => {


    return (
        <div className="PackItem">
            <span className='pack-item__size'>{unitConventer(+props.pack.quota).quota} {unitConventer(+props.pack.quota).unit}</span>
            <span className='pack-item__price'>{props.pack.price} ₽</span>
        </div>
    )
}
