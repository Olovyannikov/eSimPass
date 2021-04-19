import * as React from 'react';


interface RateCountryModel {
    country : string;
    selected : () => void;
    countryFlag : string;
}

export const RateCountry = (props : RateCountryModel) => {

    return (
        <div className="RateCountry" onClick={props.selected}>
            <div className="country">{props.country}</div>
            <div className={`flag-icon-background flag-icon-${props.countryFlag.toLowerCase()}`}/>
        </div>
    )
}
