import * as React from 'react';

import { Button } from '../../../../components/buttons/Button';

export const TopUp = () => {
    
    return (
        <div className="TopUp">
            <div className='top-up__form'>
                <div>Пополните свой счет</div>
                <input placeholder='500 ₽' type="text" className='top-up__input'/>
                <Button className='supplement' text='Пополнить'/>
                <div className='top-up__text'>От 100₽ до 10000₽</div>
            </div>
        </div>
    )
}
