import * as React from 'react';

import { Button } from '../../../../../../../../../../components/buttons/Button';
import { PassportModel } from '../PassportWrapper';

export const PassportView = (props : PassportModel) => {
    
    const { fio, sn, issueDate, birhday, address } = props.passportState;

    const handleChangeMode = () => props.toggleMode(prev => !prev)

    const convertMsToDateString = (ms : string) => new Date(ms).toLocaleDateString();
    
    return (
        <div className="PassportView">
            <div className="top">
                <span className='name'>{fio}</span>
                <span onClick={handleChangeMode} className='edit'>Редактировать</span>
            </div>
            <div className="yellow-text">
                Дата рождения: <span> {convertMsToDateString(birhday)} </span> 
            </div>
            <div className="yellow-text">
                Пол: <span> {'Женщина'} </span> 
            </div>
            <div className="yellow-text">
                Гражданство: <span> Россия </span> 
            </div>
            <div className="yellow-text">
                Серия и номер паспорта: <span> {sn} </span> 
            </div>
            <div className="yellow-text">
                Дата выдачи: <span> {convertMsToDateString(issueDate)} </span> 
            </div>
            <div className="yellow-text">Адрес: <span> {address} </span> </div>
            <Button text='Фотография загружена!' className='photo-download' />
        </div>
    )
}
