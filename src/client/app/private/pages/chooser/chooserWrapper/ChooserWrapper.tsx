import * as React from 'react';
import { ListRatesResponse } from '../../../../../generated/proto.web';
import { img_choserArrowBack } from '../../../../../resources/images';
import { Search } from './blocks/search/Search';
import { DetailedRate } from './blocks/detailedRate/DetailedRate';
import { useHistory } from 'react-router-dom';

export const ChooserWrapper = () => {

    const history = useHistory()
    
    const [rate, setRate] = React.useState(() : ListRatesResponse.SuccessModel.RateModel => null);

    const doRender = () => {
        if (rate) {
            return <DetailedRate rate={rate} />
        }
        else {
            return <Search setRate={setRate} />
        }
    }

    const handleBackClick = () => {
        if (rate) {
            setRate(null)
        }
        else {
            history.push('/cabinet')
        }
    }
    //TODO arrow position ?
    return (
        <div className="ChooserWrapper">
            <div className="img-arrow-back" onClick={handleBackClick}>
                <img src={img_choserArrowBack} alt="arrow-back"/>
            </div>
            {doRender()}
        </div>
    )
}
