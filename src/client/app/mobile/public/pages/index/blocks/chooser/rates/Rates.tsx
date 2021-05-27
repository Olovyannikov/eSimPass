import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { waitForClose, nothingToNull, Logger } from '../../../../../../../../utils';
import { Spinner } from '../../../../../../../desktop/private/components/spinnerPayment/Spinner';
import { RateCountry } from './rateCountry/RateCountry';
import { Button } from '../../../../../../../desktop/private/components/buttons/Button';
import Router from 'next/router';
import { State } from '../../../../../../../../redux/State';
import { connect } from 'react-redux';

interface RatesModel extends ReturnType<typeof mapStateToProps> {
    showDefaultRates : boolean;
    filter : string;
    selected : (rate : ListRatesResponse.SuccessModel.RateModel) => void;
    setShowDefaultRates : React.Dispatch<React.SetStateAction<boolean>>;
}

const RatesImpl = (props : RatesModel) => {

    const logger = new Logger ("Chooser Input Rates");

    const closedSubject = waitForClose();

    const [allRates, setAllRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => [])
    const [filteredRates, setFilteredRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => [])
    const [inProgress, setInProgress] = React.useState<boolean>(false);
    
    // React.useEffect(() => {
    //     CONNECTION.listRates({})
    //         .do(response => setAllRates (rates => rates = response.success.rates))
    //         .do(() => setInProgress(prev => prev = false))
    //         .takeUntil(closedSubject)
    //         .subscribe(logger.rx.subscribe('Error in received list rates'))
        
    // }, [])

    React.useEffect(() => {

        const filter = nothingToNull(props.filter)

        setAllRates(prev => prev = props.listRates)
        
        if (filter != null) {
            setFilteredRates (filteredRates => filteredRates = allRates
                .filter (rate => rate.countryName.toLocaleLowerCase ().indexOf (filter.toLocaleLowerCase ()) >= 0)
            )
        }
        else {

            if (allRates) {
                // temporary for popular country 
                const randomNumber = Math.floor(Math.random() * allRates.length)
                setFilteredRates(filteredRates => filteredRates = allRates.slice(randomNumber, randomNumber + 8))
            }
        }

        
    }, [props.filter, allRates])

    const showAllRates = () => {
        props.setShowDefaultRates(prev => prev = false);
        setFilteredRates(prev => prev = allRates);
    }

    const handleConnect = () =>  Router.push('/registration')

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
                    {filteredRates.map (rate => <RateCountry key={rate.countryId} countryFlag={rate.countryId} country={rate.countryName} selected={() => props.selected (rate)} />)}
                    <div onClick={showAllRates} className="show-all-countries">показать все страны</div>
                    <Button func={handleConnect} text='Подключить eSIM' className='button-connect' />
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
                    {filteredRates.map (rate => <RateCountry key={rate.countryId} countryFlag={rate.countryId} country={rate.countryName} selected={() => props.selected (rate)} />)}
                    <Button func={handleConnect} text='Подключить eSIM' className='button-connect'/>
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

const mapStateToProps = (state : State) => ({
    listRates : state.listRates,
})

export const Rates = connect(mapStateToProps)(RatesImpl)
