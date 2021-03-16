import * as React from 'react';
import { PACK_DURATION } from '../../../../generated/proto.web';

import { convertDateUntilPackage } from '../../../../utils';
import { Button } from '../buttons/Button';

export interface BuyRateModel {
    duration : PACK_DURATION;
    boughtDate : string;
}

export const BuyRate = (props : BuyRateModel) => {


    return (
        <div className="BuyRate">
            <div className="until">Действует до <span className='date'>{convertDateUntilPackage(props.boughtDate, props.duration).toLocaleDateString()}</span></div>
            <Button className='button-buy' text='Купить пакет' />
            <div className="off-rate">Отключить интернет</div>
        </div>
    )
}
