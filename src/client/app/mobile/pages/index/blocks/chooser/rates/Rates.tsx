import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import { CONNECTION } from '../../../../../../../Connection';

import { ListRatesResponse } from '../../../../../../../generated/proto.web';
import { waitForClose, nothingToNull } from '../../../../../../../utils';
import { Spinner } from '../../../../../../private/components/spinnerPayment/Spinner';
import { RateCountry } from './rateCountry/RateCountry';
import { Button } from '../../../../../../private/components/buttons/Button';

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
                    <div className="show-all-countries">показать все страны</div>
                    <Button text='Подключить eSIM' className='button-connect' />
                </>
            )
        }
        else {
            return (
                <>
                    <div className="title">Поиск</div>
                    {filteredRates.map (rate => <RateCountry key={rate.rateId} country={rate.countryName} selected={() => props.selected (rate)} />)}
                    <div className="show-all-countries">показать все страны</div>
                    <Button text='Подключить eSIM' className='button-connect'/>
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
