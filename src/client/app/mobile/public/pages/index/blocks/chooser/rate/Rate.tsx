import * as React from 'react';

import { Pack } from '../../../../../../../desktop/private/pages/chooser/chooserWrapper/blocks/detailedRate/pack/Pack';
import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import Router from 'next/router';

interface RateModel {
    rate : ListRatesResponse.SuccessModel.RateModel
}

export const Rate = (props : RateModel) => {

    const toRegistration = () => Router.push('/registration');
    
    return (
        <div className="Rate">
            {props.rate.packs.map((el, index) => (
                <Pack action={toRegistration} key={index} typeText='Пакетный тариф' pack={el} rate={props.rate} />
            ))}
        </div>
    )
}
