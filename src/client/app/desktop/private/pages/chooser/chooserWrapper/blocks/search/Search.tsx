import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { img_chooserLupa } from '../../../../../../../../resources/images';
import { Rates } from './rates/Rates';

interface SearchModel {
    setRate : React.Dispatch<React.SetStateAction<ListRatesResponse.SuccessModel.RateModel>>
}

export const Search = (props : SearchModel) => {

    const [value, setValue] = React.useState<string>('');
    const [filter, setFilter] = React.useState<string>(null);
    const [showDefaultRates, setShowDefaultRates] = React.useState<boolean>(true)

    const handleChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValue(prev => prev = e.target.value);
        setFilter(e.target.value);
        setShowDefaultRates(show => show = false);
        if (!e.target.value) {
            setShowDefaultRates(show => show = true)
        }
    }

    const onSelected = (rate : ListRatesResponse.SuccessModel.RateModel) => {
        props.setRate(rate);
        // setValue(prev => prev = rate.countryName);
        setShowDefaultRates(show => show = false);
    }

    return (
        <div className="Search">
            <div className="input-search-block">
                <input className='search-input' value={value} onChange={handleChangeInput} placeholder='Выберите страну отправления' />
                <img className='search-lupa' src={img_chooserLupa} alt="Search"/>
            </div>
            <Rates showDefaultRates={showDefaultRates} filter={filter} selected={onSelected} />
        </div>
    )
}
