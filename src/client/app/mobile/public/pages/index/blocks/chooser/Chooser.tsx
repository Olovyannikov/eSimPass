
/*
import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../generated/proto.web';
import { Rate } from './rate/Rate';
import { Rates } from './rates/Rates';

export const Chooser = () => {

    const [rate, setRate] = React.useState(() : ListRatesResponse.SuccessModel.RateModel => null)
    const [value, setValue] = React.useState<string>('');
    const [filter, setFilter] = React.useState<string>(null);
    const [showDefaultRates, setShowDefaultRates] = React.useState<boolean>(true);

    const handleChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValue(prev => prev = e.target.value);
        setFilter(e.target.value);
        setShowDefaultRates(show => show = false);
        if (!e.target.value) {
            setShowDefaultRates(show => show = true)
        }
    }

    const onSelected = (rate : ListRatesResponse.SuccessModel.RateModel) => {
        setRate(rate)
        setShowDefaultRates(show => show = false);
    }

    const handlebackClick = () => {
        setShowDefaultRates(prev => prev = true)
        setRate(prev => prev = null)
    }

    const doRender = () => {
        if (rate) {
            return (
                <>
                    <div onClick={handlebackClick} className="back">Назад</div>
                    <div className="country">{rate.countryName}</div>
                    <Rate rate={rate} />
                </>
            )
        }
        else {
            return (
                <>
                    <input value={value} onChange={handleChangeInput}  className='search' type="text" placeholder='Найти страну'/>
                    <Rates setShowDefaultRates={setShowDefaultRates} showDefaultRates={showDefaultRates} filter={filter} selected={onSelected} />
                </>
            ) 
        }
    }

    return (
        <div className="Chooser">
            {doRender()}
        </div>
    )
}
*/