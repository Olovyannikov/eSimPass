import * as React from 'react';
import { ListRatesResponse } from '../../../../../../../../../../../generated/proto.web';

export const PackItem = (props : {
    pack : ListRatesResponse.SuccessModel.RateModel.PackModel
}) => {

    const toMb = (quota : string) : number => {
        return Number(quota) / 1024 / 1024;
    }

    return (
        <div className="PackItem">
            <span className='pack-item__size'>{toMb(props.pack.quota)} MB</span>
            <span className='pack-item__price'>{props.pack.price} €</span>
        </div>
    )
}
