import * as React from 'react';

// import { Pack } from '../../../../../../../desktop/private/pages/chooser/chooserWrapper/blocks/detailedRate/pack/Pack';
import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { useHistory } from 'react-router-dom';

interface RateModel {
    rate : ListRatesResponse.SuccessModel.RateModel
}

export const Rate = (props : RateModel) => {

    const history = useHistory();

    const toRegistration = () => history.push('/registration');
    
    return (
        <div className="Rate">
            {props.rate.packs.map((el, index) => (
                <div>{el.price}</div>
                // <Pack action={toRegistration} key={index} typeText='Пакетный тариф' pack={el} rate={props.rate} />
            ))}
        </div>
    )
}
