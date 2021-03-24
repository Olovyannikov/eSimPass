import * as React from 'react';

import { Button } from '../../../../../../../../../../components/buttons/Button';
import { PassportModel } from '../PassportWrapper';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

enum Gender {
    male = 'Мужчина',
    women = 'Женщина'
}

interface PassportStateModel {
    bornDate? : Date;
    gotDate? : Date;
    // gender? : string;
    citizenship? : string;
    series? : string;
    fullName? : string;
    address? : string;
}

export const PassportEdit = (props : PassportModel) => {

    const [passportState, setPassportState] = React.useState<PassportStateModel>({
        bornDate : null,
        gotDate : null,
        citizenship : '',
        series : '',
        fullName : '',
        address : ''
    })

    const [error, setError] = React.useState<boolean>(null)

    const handleInputChange = (key : string, event? : React.ChangeEvent<HTMLInputElement> , date? : Date | [Date, Date]) => {
        if (key === 'gender') {
            setPassportState(prev => ({
                ...prev,
                [key] : event.target.checked
            }))
        }
        else if (event) {
            setPassportState(prev => ({
                ...prev,
                [key] : event.target.value
            }))
        }
        else {
            setPassportState(prev => ({
                ...prev,
                [key] : date
            }))
        }
    }


    const saveChanges = () => {
        const {address, series, gotDate, bornDate, fullName, citizenship} = passportState

        if (address && series && gotDate && bornDate && fullName && citizenship) {
            props.toggleMode(prev => !prev)
        }
        else {
            setError(true)
        }
    }

    const renderError = () => {
        if (error) {
            return <div className="error">Заполните все поля</div>
        }
    }
    
    return (
        <div className="PassportEdit">
            <div className="top">
                <input 
                    placeholder='Фамилия Имя Отчество' 
                    onChange={(e) => handleInputChange('fullName', e)} 
                    value={passportState.fullName} 
                    className='input-name' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Дата рождения: 
                <DatePicker 
                    placeholderText='ММ.ДД.ГГГГ' 
                    className='input input-date' 
                    selected={passportState.bornDate} 
                    onChange={(date) => handleInputChange('bornDate', null , date)}
                />
            </div>
            <div className="yellow-text">
                Пол:
                <input 
                    // onChange={(e) => handleInputChange('gender', e)}

                    className='radio' 
                    value='Жен' 
                    type="radio" 
                    name="gender"
                /> 
                <span>Жен</span>
                <input 
                    className='radio' 
                    value='Муж' 
                    type="radio" 
                    name="gender"
                /> 
                <span>Муж</span>
            </div>
            <div className="yellow-text">
                Гражданство: 
                <input 
                    onChange={(e) => handleInputChange('citizenship', e)} 
                    value={passportState.citizenship} 
                    className='input citizenship' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Серия и номер паспорта: 
                <input 
                    onChange={(e) => handleInputChange('series', e)} 
                    value={passportState.series} 
                    className='input passport-series' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Дата выдачи: 
                <DatePicker 
                    placeholderText='ММ.ДД.ГГГГ' 
                    className='input input-date' 
                    selected={passportState.gotDate} 
                    onChange={(date) => handleInputChange('gotDate', null ,date)}
                />
            </div>
            <div className="yellow-text">
                Адрес: 
                <input 
                    onChange={(e) => handleInputChange('address', e)} 
                    value={passportState.address} 
                    className='input address' 
                    type='text'
                />
            </div>
            <Button text='Загрузите фотографию паспорта' className='photo-download' />
            <div onClick={saveChanges} className='edit'>Сохранить</div>
            {renderError()}
        </div>
    )
}
