import * as React from 'react';


interface RateCountryModel {
    country : string;
    selected : () => void;
    countryFlag : string;
}

export const RateCountry = React.memo((props : RateCountryModel) => {
    React.useEffect(() => {
        console.log('rendered');
        
    }, [])
    return (
        <div className="RateCountry" onClick={props.selected}>
            <div className="country">{props.country}</div>
            <div className={`flag-icon-background flag-icon-${props.countryFlag.toLowerCase()}`}/>
        </div>
    )
}, (prevProps, nextProps) => {
    if (prevProps.countryFlag === nextProps.countryFlag) {
        return true
    }
    else {
        return false
    }
})
