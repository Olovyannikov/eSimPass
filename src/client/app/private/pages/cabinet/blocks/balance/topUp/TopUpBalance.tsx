import * as React from 'react';

import { Button } from '../../../../../components/buttons/Button';

export const TopUpBalance = () => {
    return (
        <div className="TopUpBalance">
            <div className='top-up-block'>
                <div>Пополните свой счет</div>
                <input placeholder='500 ₽' type="text" className='input'/>
                <Button className='button-top-up' text='Пополнить'/>
                <div className='text'>От 100₽ до 10000₽</div>
            </div>
        </div>
    )
}
