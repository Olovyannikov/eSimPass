import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../generated/proto.web';
import { img_flagFrance } from '../../../../../../../resources/images';

interface DetailedRateModel {
    rate: ListRatesResponse.SuccessModel.RateModel
}

export const DetailedRate = (props : DetailedRateModel) => {
    console.log(props);
    
    return (
        <div className="DetailedRate">
            <div className="flag-name">
                <div className="country">
                    {props.rate.countryName}
                </div>
                <img className='flag-img' src={img_flagFrance} alt={props.rate.countryName} />
            </div>
        </div>
    )
}
