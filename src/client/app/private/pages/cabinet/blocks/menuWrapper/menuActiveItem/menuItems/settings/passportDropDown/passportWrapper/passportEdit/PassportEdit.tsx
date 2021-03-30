import * as React from 'react';

import { PassportModel } from '../PassportWrapper';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ImageUpload } from './imageUpload/ImageUpload';
import { SetDocumentRequest } from '../../../../../../../../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../../../../../../../utils';
import { CONNECTION } from '../../../../../../../../../../../../Connection';



export const PassportEdit = (props : PassportModel) => {    

    const logger = new Logger('Passport edit');

    const closedSubject = waitForClose();

    const [error, setError] = React.useState<boolean>(null);

    const radioMaleRef = React.useRef<HTMLInputElement>();
    const [inProgress, setInProgress] = React.useState<boolean>(false);

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
            props.setPassportState(prev => ({
                ...prev,
                [key] : Date.parse(String(date))
            }))
        }
    }

    const saveChanges = () => {
        const {address, sn, issueDate, birhday, fio, photo} = props.passportState

        if (address && sn && issueDate && birhday && fio) {
            handleSaveDocument();
        }
        else {
            setError(true)
        }
    }

    const createSetDocumentRequest = () : SetDocumentRequest => ({
        address : props.passportState.address,
        birhday : props.passportState.birhday,
        fio : props.passportState.fio,
        issueDate : props.passportState.issueDate,
        sn : props.passportState.sn,
        phone : '1234',
        photo : props.passportState.photo.toString('base64') as any as Buffer || null,
    });

    const handleSaveDocument = () => {

        setInProgress(prev => prev = true);

        CONNECTION.setDocument(createSetDocumentRequest())
            .do(response => {
                if (response.success) {
                    props.toggleMode(prev => !prev)
                }
                else {
                    setError(true)
                }
            })
            .do(() => setInProgress(prev => prev = false))
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in create set document response'))
    }

    const renderError = () => {
        if (error) {
            return <div className="error">Заполните все поля</div>
        }
    }

    // const returnValidDate = (date : string) => {
    //     if (props.passportState?.birhday && date === 'birhday') {
    //         return new Date(+props.passportState.birhday)
    //     }
    //     else if (props.passportState?.issueDate && date === 'issueDate') {
    //         return new Date(+props.passportState.issueDate)
    //     }
    //     else {
    //         return new Date
    //     }
    // }
    
    return (
        <div className="PassportEdit">
            <div className="top">
                <input 
                    disabled={inProgress}
                    placeholder='Фамилия Имя Отчество' 
                    onChange={(e) => handleInputChange('fio', e)} 
                    value={props.passportState?.fio} 
                    className='input-name' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Дата рождения: 
                <DatePicker 
                    disabled={inProgress}
                    dateFormat='dd/MM/yyyy'
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText='ДД.ММ.ГГГГ' 
                    className='input input-date' 
                    selected={props.passportState?.birhday ? new Date(+props.passportState?.birhday) : new Date()} 
                    onChange={(date) => handleInputChange('birhday', null , date)}
                />
            </div>
            <div onChange={handleRadioButtonsChange} className="yellow-text">
                Пол:
                <input 
                    disabled={inProgress}
                    defaultChecked
                    className='radio' 
                    value='Жен' 
                    type="radio" 
                    name="gender"
                /> 
                <span>Жен</span>
                <input 
                    disabled={inProgress}
                    ref={radioMaleRef}
                    // defaultChecked={props.passportState.gender === 'Мужчина' ? true : false}
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
                disabled={inProgress}
                    // onChange={(e) => handleInputChange('citizenship', e)} 
                    // value={props.passportState.citizenship} 
                    className='input citizenship' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Серия и номер паспорта: 
                <input 
                    disabled={inProgress}
                    onChange={(e) => handleInputChange('sn', e)} 
                    value={props.passportState?.sn} 
                    className='input passport-series' 
                    type='text' 
                />
            </div>
            <div className="yellow-text">
                Дата выдачи: 
                <DatePicker 
                    disabled={inProgress}
                    dateFormat='dd/MM/yyyy'
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText='ДД.ММ.ГГГГ' 
                    className='input input-date' 
                    selected={props.passportState?.issueDate ? new Date(+props.passportState?.issueDate) : new Date()} 
                    onChange={(date) => handleInputChange('issueDate', null ,date)}
                />
            </div>
            <div className="yellow-text">
                Адрес: 
                <input 
                    disabled={inProgress}
                    onChange={(e) => handleInputChange('address', e)} 
                    value={props.passportState?.address} 
                    className='input address' 
                    type='text'
                />
            </div>
            <ImageUpload disabled={inProgress} passportImage={props.passportState?.photo} setPassportImage={props.setPassportState} />
            <div onClick={saveChanges} className='edit'>Сохранить</div>
            {renderError()}
        </div>
    )
}

