import * as React from 'react';
import { Logger } from '@glonassmobile/codebase-web/Logger';

import { CONNECTION } from '../../../../../../../../../Connection';
import { nothingToNull, waitForClose } from '../../../../../../../../../utils';
import { ListRatesResponse } from '../../../../../../../../../generated/proto.web';
import { RateCountry } from './rateCountry/RateCountry';
import { Spinner } from '../../../../../../components/spinnerPayment/Spinner';

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
    const [inProgress, setInProgress] = React.useState<boolean>(true);

    React.useEffect(() => {
        CONNECTION.listRates({})
            .do(response => setAllRates (rates => rates = response.success.rates))
            .do(() => setInProgress(prev => prev = false))
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
            // temporary for popular country 
            const randomNumber = Math.floor(Math.random() * allRates.length)
            setFilteredRates(filteredRates => filteredRates = allRates.slice(randomNumber, randomNumber + 8))
        }
            
            console.log(filteredRates);
        
    }, [props.filter, allRates])

    const renderRates = () => {
        if (inProgress) {
            return (
                <>
                    <div className="title">Популярные страны</div>
                    <Spinner />
                </>
            )
        }
        else if (props.showDefaultRates) {
            return (
                <>
                    <div className="title">Популярные страны</div>
                    {filteredRates.map (rate => <RateCountry key={rate.rateId} country={rate.countryName} selected={() => props.selected (rate)} />)}
                </>
            )
        }
        else if (filteredRates.length === 0) {
            return (
                <>
                    <div className="title">Поиск</div>
                    <div className="no-matches">Нет совпадений</div>
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
