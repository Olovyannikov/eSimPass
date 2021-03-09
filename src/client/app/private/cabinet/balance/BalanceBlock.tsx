import * as React from 'react';

import { TopUp } from './topUp/TopUp';


export const BalanceBlock = () => {
    return (
        <div className="BalanceBlock">
            <div className="balance-block__wrap">
                <div className="balance-block__balance">
                    <div className='balance-block__text'>Текущий баланс<span>600 ₽</span></div>
                </div>
                <TopUp />
            </div>
        </div>
    )
}
