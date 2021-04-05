import * as React from 'react';

import { ListRatesResponse } from '../../../../../../generated/proto.web';
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

    return (
        <div className="Chooser">
            <input value={value} onChange={handleChangeInput}  className='search' type="text" placeholder='Найти страну'/>
            <Rates showDefaultRates={showDefaultRates} filter={filter} selected={onSelected} />
        </div>
    )
}
