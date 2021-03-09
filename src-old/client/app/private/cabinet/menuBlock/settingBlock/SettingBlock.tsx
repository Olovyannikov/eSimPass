import * as React from 'react';
import { DropDown } from '../../dropDown/DropDown';

interface Setting {
    email : string;
    password : string;
}

export const SettingBlock = () => {

    const [state, setState] = React.useState<Setting>({
        email : 'alexbolduin@gmail.com',
        password : 'HDfr213'
    })

    const handleChange = (name : string, value : string) : void => {
        setState(prev => ({
            ...prev,
            [name] : value
        }))
    }

    return (
        <>
            <DropDown />
            <div className="SettingBlock">
                <div className="setting-block__title">Настройки входа</div>
                <div className="setting-block__form-setting">
                    <div className="setting-block__left-form">
                        <div className='setting-block__label'>Пароль</div>
                        <input value={state.password} onChange={({target}) => handleChange('password', target.value)} placeholder='Пароль' className='setting-block__input' type="text"/>
                        <input placeholder='Новый пароль' className='setting-block__input' type="text"/>
                        <div className="setting-block__dont-remember">Не помню пароль</div>
                        <div className="setting-block__button-change">
                            <div>Изменить</div>
                        </div>
                    </div>
                    <div className="setting-block__right-form">
                        <div className='setting-block__label'>E-mail</div>
                        <input value={state.email} onChange={({target}) => handleChange('email', target.value)} placeholder='E-mail' className='setting-block__input' type="email"/>
                    </div>
                </div>
            </div>
        </>
    )
}
