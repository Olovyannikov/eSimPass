import * as React from 'react';

import { img_flagFrance } from '../../../../../../../../resources/images';

interface RateCountryModel {
    country : string;
    selected : () => void
}

export const RateCountry = (props : RateCountryModel) => {

    return (
        <div className="RateCountry">
            <div className="country">{props.country}</div>
            <img className='img-flag' src={img_flagFrance} alt={props.country}/>
        </div>
    )
}
