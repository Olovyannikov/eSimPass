import * as React from "react";
import { ListRatesResponse } from "../../../../../../../../../generated/proto.web";
import { Country } from "./country/Country";
import { Logger, nothingToNull, waitForClose } from '../../../../../../../../../utils';
import { CONNECTION } from "Connection";
import { STATE_API } from "redux/StateApi";
import * as ro from "rxjs/operators"


interface Props {
    filter : string,
    show : boolean,
    selected : (rate : ListRatesResponse.SuccessModel.RateModel) => void;
}



export const Chooser = (props : Props) => {
    
    const [allRates, setAllRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => []);
    const [filteredRates, setFilteredRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => []);

    const logger = new Logger ("Chooser Input Rates");
    const closedSubject = waitForClose();

    React.useEffect(() => {
        CONNECTION.listRates({})
            .pipe (
                ro.tap(response => setAllRates (rates => rates = response.success.rates)),
                ro.takeUntil(closedSubject)
            )
            .subscribe(logger.rx.subscribe('Error in received list rates'))

    }, [])

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
            {filteredRates && filteredRates.map (rate => <Country key={rate.countryId} model={rate} clicked={() => props.selected (rate)}/>)}
        </div>
    )
}

