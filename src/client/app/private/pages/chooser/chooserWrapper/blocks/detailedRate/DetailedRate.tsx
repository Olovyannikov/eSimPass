import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../generated/proto.web';
import { img_flagFrance } from '../../../../../../../resources/images';
import { Pack } from './pack/Pack';
import { PacksCarousel } from './packsCarousel/PacksCarousel';

interface DetailedRateModel {
    rate: ListRatesResponse.SuccessModel.RateModel
}

export const DetailedRate = (props : DetailedRateModel) => {
    console.log(props.rate);
    
    return (
        <div className="DetailedRate">
            <div className="flag-name">
                <div className="country">
                    {props.rate.countryName}
                </div>
                <img className='flag-img' src={img_flagFrance} alt={props.rate.countryName} />
            </div>
            <Pack static={true} typeText='Дополнительные услги' rate={props.rate} />
            <Pack typeText='Помегабайтный тариф' rate={props.rate} />
            <PacksCarousel rate={props.rate} />
        </div>
    )
}
