import * as React from 'react';

import { Button } from '../../../../../../../../../../components/buttons/Button';
import { PassportModel } from '../PassportWrapper';

export const PassportView = (props : PassportModel) => {

    const { fullName, series, gotDate, gender, citizenship, bornDate, address } = props.passportState;

    const handleChangeMode = () => props.toggleMode(prev => !prev)

    const convertMsToDateString = (ms : string) => new Date(ms).toLocaleDateString();
    
    return (
        <div className="PassportView">
            <div className="top">
                <span className='name'>{fullName}</span>
                <span onClick={handleChangeMode} className='edit'>Редактировать</span>
            </div>
            <div className="yellow-text">
                Дата рождения: <span> {convertMsToDateString(bornDate)} </span> 
            </div>
            <div className="yellow-text">
                Пол: <span> {gender} </span> 
            </div>
            <div className="yellow-text">
                Гражданство: <span> {citizenship} </span> 
            </div>
            <div className="yellow-text">
                Серия и номер паспорта: <span> {series} </span> 
            </div>
            <div className="yellow-text">
                Дата выдачи: <span> {convertMsToDateString(gotDate)} </span> 
            </div>
            <div className="yellow-text">Адрес: <span> {address} </span> </div>
            <Button text='Фотография загружена!' className='photo-download' />
        </div>
    )
}
