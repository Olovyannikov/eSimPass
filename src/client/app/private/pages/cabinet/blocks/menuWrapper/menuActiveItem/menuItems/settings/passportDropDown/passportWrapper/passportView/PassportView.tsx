import * as React from 'react';

import { Button } from '../../../../../../../../../../components/buttons/Button';
import { PassportModel } from '../PassportWrapper';

export const PassportView = (props : PassportModel) => {

    const handleChangeMode = () => props.toggleMode(prev => !prev)
    
    return (
        <div className="PassportView">
            <div className="top">
                <span className='name'>Иванова Александра Юрьевна</span>
                <span onClick={handleChangeMode} className='edit'>Редактировать</span>
            </div>
            <div className="born yellow-text">Дата рождения: <span> 22.04.1994</span> </div>
            <div className="gender yellow-text">Пол: <span> Женский</span> </div>
            <div className="citizenship yellow-text">Гражданство: <span> Россия</span> </div>
            <div className="series yellow-text">Серия и номер паспорта: <span> 4230 350032</span> </div>
            <div className="date-passport yellow-text">Дата выдачи: <span> 01.02.2018</span> </div>
            <div className="address yellow-text">Адрес: <span> Россия, Москва, Красная площадь 1, к в1</span> </div>
            <Button text='Фотография загружена' className='photo-download' />
        </div>
    )
}
