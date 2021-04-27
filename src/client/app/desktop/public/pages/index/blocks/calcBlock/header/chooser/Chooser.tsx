import { Logger } from "@glonassmobile/codebase-web/Logger";
import { useEffectRx } from "@glonassmobile/codebase-web/useEffectRx";
import * as React from "react";
import { ListRatesResponse } from "../../../../../../../../../generated/proto.web";
import { Country } from "./country/Country";
import { CONNECTION } from '../../../../../../../../../Connection'
import { nothingToNull } from '../../../../../../../../../utils';

interface Props {
    filter : string,
    show : boolean,
    selected : (rate : ListRatesResponse.SuccessModel.RateModel) => void
}

export const Chooser = (props : Props) => {

    const logger = new Logger ("Chooser");

    const [allRates, setAllRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => []);
    const [filteredRates, setFilteredRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => []);

    useEffectRx (logger, "Error retrieving rates", CONNECTION.listRates ({})
        .do (response => setAllRates (rates => rates = response.success.rates))
    )

    React.useEffect (() => {
        
        const filter = nothingToNull (props.filter)
        
        if (filter != null) {
            setFilteredRates (filteredRates => filteredRates = allRates
                .filter (rate => rate.countryName.toLocaleLowerCase ().indexOf (filter.toLocaleLowerCase ()) >= 0)
            )
        }
        else {
            setFilteredRates (filteredRates => filteredRates = allRates)
        }

    }, [props.filter, allRates])
    
    const getDisplay = () => {
        if (props.show) {
            return "block"
        }
        else {
            return "none"
        }
    }

    return (
        <div className="Chooser" style={{display : getDisplay ()}}>
            {filteredRates.map (rate => <Country key={rate.countryId} model={rate} clicked={() => props.selected (rate)}/>)}
        </div>
    )
}

