import * as React from 'react';
import { ListRatesResponse } from '../../../../../../generated/proto.web';
import { img_choserArrowBack } from '../../../../../../resources/images';
import { Search } from './blocks/search/Search';
import { DetailedRate } from './blocks/detailedRate/DetailedRate';
import Router from 'next/router';
import { ChooseDevice } from './blocks/chooseDevice/ChooseDevice';


export const ChooserWrapper = () => {
    
    const [rate, setRate] = React.useState(() : ListRatesResponse.SuccessModel.RateModel => null);
    const [choosenPack, setChoosenPack] = React.useState<ListRatesResponse.SuccessModel.RateModel.PackModel>(null)

    const handleChoosenPack = (pack : ListRatesResponse.SuccessModel.RateModel.PackModel) => {
        setChoosenPack(prev => prev = pack)
    } 

    const doRender = () => {
        if (rate && choosenPack) {
            return <ChooseDevice rate={rate} pack={choosenPack} />
        }
        else if (rate) {
            return <DetailedRate setChoosenPack={handleChoosenPack} rate={rate} />
        }
        else {
            return <Search setRate={setRate} />
        }
    }

    const handleBackClick = () => {
        if (choosenPack) {
            setChoosenPack(null)
        }
        else if (rate) {
            setRate(null)
        }
        else {
            Router.push('/cabinet')
        }
    }

    return (
        <div className="ChooserWrapper">
            <div className="img-arrow-back" onClick={handleBackClick}>
                <img src={img_choserArrowBack} alt="arrow-back"/>
            </div>
            {doRender()}
        </div>
    )
}

