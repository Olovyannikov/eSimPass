import * as React from 'react';
import { dateUntil } from '../../../codebase/utils';
import { PACK_DURATION } from '../../../generated/proto.web';
import { Button } from '../buttons/Button';

export interface BuyRateProps {
    duration : PACK_DURATION;
    boughtDate : string
}

export const BuyRate = ({boughtDate, duration} : BuyRateProps) => {
    
    return (
        <div className="BuyRate">
            <div className="buy-rate__until">Действует до <span className='buy-rate__date'>{dateUntil(boughtDate, duration).toLocaleDateString()}</span></div>
            <Button className='buy' text='Купить пакет' />
            <div className="buy-rate__off-rate">Отключить интернет</div>
        </div>
    )
}
