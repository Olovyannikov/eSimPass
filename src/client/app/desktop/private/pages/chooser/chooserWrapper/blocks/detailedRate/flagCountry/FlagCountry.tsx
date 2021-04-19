import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../../../generated/proto.web';

interface FlagCountryModel {
    rate: ListRatesResponse.SuccessModel.RateModel;
}

export const FlagCountry = (props : FlagCountryModel) => {

    return (
        <div className="FlagCountry">
            <div className="country">
                {props.rate.countryName}
            </div>
            <div className={`flag-icon-background flag-icon-${props.rate.countryId.toLowerCase()}`} />
        </div>
    )
}
