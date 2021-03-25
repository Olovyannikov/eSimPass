import * as React from 'react';

import { PassportModel } from '../PassportWrapper';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ImageUpload } from './imageUpload/ImageUpload';


export const PassportEdit = (props : PassportModel) => {


    const [error, setError] = React.useState<boolean>(null);

    const radioMaleRef = React.useRef<HTMLInputElement>();
    
    const handleRadioButtonsChange = () => {
        props.setPassportState(prev => ({
            ...prev,
            gender : radioMaleRef.current.checked ? 'Мужчина' : 'Женщина'
        }))
    }

    const handleInputChange = (key : string, event? : React.ChangeEvent<HTMLInputElement> , date? : Date | [Date, Date]) => {
        
        if (event) {
            props.setPassportState(prev => ({
                ...prev,
                [key] : event.target.value
            }))
        }
        else {
            console.log('date', Date.parse(String(date)), new Date(Date.parse(String(date))));
            
            props.setPassportState(prev => ({
                ...prev,
                [key] : Date.parse(String(date))
            }))
        }
    }


    const saveChanges = () => {
        const {address, series, gotDate, bornDate, fullName, citizenship, gender} = props.passportState

        if (address && series && gotDate && bornDate && fullName && citizenship && gender) {
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
                    value={props.passportState.fullName} 
                    className='input-name' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Дата рождения: 
                <DatePicker 
                    dateFormat='dd/MM/yyyy'
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText='ДД.ММ.ГГГГ' 
                    className='input input-date' 
                    selected={new Date(props.passportState.bornDate)} 
                    onChange={(date) => handleInputChange('bornDate', null , date)}
                />
            </div>
            <div onChange={handleRadioButtonsChange} className="yellow-text">
                Пол:
                <input 
                    defaultChecked={props.passportState.gender === 'Женщина' ? true : false}
                    className='radio' 
                    value='Жен' 
                    type="radio" 
                    name="gender"
                /> 
                <span>Жен</span>
                <input 
                    ref={radioMaleRef}
                    defaultChecked={props.passportState.gender === 'Мужчина' ? true : false}
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
                    value={props.passportState.citizenship} 
                    className='input citizenship' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Серия и номер паспорта: 
                <input 
                    onChange={(e) => handleInputChange('series', e)} 
                    value={props.passportState.series} 
                    className='input passport-series' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Дата выдачи: 
                <DatePicker 
                    dateFormat='dd/MM/yyyy'
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText='ДД.ММ.ГГГГ' 
                    className='input input-date' 
                    selected={new Date(props.passportState.gotDate)} 
                    onChange={(date) => handleInputChange('gotDate', null ,date)}
                />
            </div>
            <div className="yellow-text">
                Адрес: 
                <input 
                    onChange={(e) => handleInputChange('address', e)} 
                    value={props.passportState.address} 
                    className='input address' 
                    type='text'
                />
            </div>
            <ImageUpload passportImage={props.passportState.image} setPassportImage={props.setPassportState} />
            <div onClick={saveChanges} className='edit'>Сохранить</div>
            {renderError()}
        </div>
    )
}
