import * as React from 'react';
import { Logger } from '@glonassmobile/codebase-web/Logger';

import { CONNECTION } from '../../../../../../../../Connection';
import { nothingToNull, waitForClose } from '../../../../../../../../utils';
import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { RateCountry } from './rateCountry/RateCountry';

interface RatesModel {
    showDefaultRates : boolean;
    filter : string;
    selected : (rate : ListRatesResponse.SuccessModel.RateModel) => void
}

export const Rates = (props : RatesModel) => {

    const logger = new Logger ("Chooser Input Rates");

    const closedSubject = waitForClose();

    const [allRates, setAllRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => [])
    const [filteredRates, setFilteredRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => [])

    React.useEffect(() => {
        CONNECTION.listRates({})
            .do(response => setAllRates (rates => rates = response.success.rates))
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in received list rates'))

    }, [])

    React.useEffect(() => {
        
        const filter = nothingToNull(props.filter)

        if (filter != null) {
            setFilteredRates (filteredRates => filteredRates = allRates
                .filter (rate => rate.countryName.toLocaleLowerCase ().indexOf (filter.toLocaleLowerCase ()) >= 0)
            )
        }
        else {
            setFilteredRates([])
        }
        // else {
        //     setFilteredRates (filteredRates => filteredRates = allRates)
        // }
        
    }, [props.filter, allRates])

    const renderRates = () => {
        if (props.showDefaultRates) {
            return (
                <>
                    <div className="title">Популярные страны</div>
                    {filteredRates.map (rate => <RateCountry key={rate.rateId} country={rate.countryName} selected={() => props.selected (rate)} />)}
                </>
            )
        }
        else {
            return (
                <>
                    <div className="title">Поиск</div>
                    {filteredRates.map (rate => <RateCountry key={rate.rateId} country={rate.countryName} selected={() => props.selected (rate)} />)}
                </>
            )
        }
    }

    return (
        <div className="Rates">
            {renderRates()}
        </div>
    )
}
