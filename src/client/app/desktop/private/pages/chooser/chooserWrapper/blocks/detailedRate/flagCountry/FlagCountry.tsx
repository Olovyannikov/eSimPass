import * as React from 'react';
import { ListRatesResponse } from '../../../../../../../../../generated/proto.web';

import { img_flagFrance } from '../../../../../../../../../resources/images';

interface FlagCountryModel {
    rate: ListRatesResponse.SuccessModel.RateModel;
}

export const FlagCountry = (props : FlagCountryModel) => {
    return (
        <div className="FlagCountry">
        <div className="country">
            {props.rate.countryName}
        </div>
        <img className='flag-img' src={img_flagFrance} alt={props.rate.countryName} />
    </div>
    )
}
