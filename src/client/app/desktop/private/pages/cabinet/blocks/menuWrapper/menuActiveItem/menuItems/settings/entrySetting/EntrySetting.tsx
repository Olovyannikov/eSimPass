import * as React from 'react';

import { CONNECTION } from '../../../../../../../../../../../Connection';
import { ChangePasswordRequest } from '../../../../../../../../../../../generated/proto.web';
import { STORAGE } from '../../../../../../../../../../../StorageAdapter';
import { nothingToNull, waitForClose, Logger } from '../../../../../../../../../../../utils';
import { Button } from '../../../../../../../../components/buttons/Button';

export const EntrySetting = () => {

    const logger = new Logger('Entry Setting block');

    const closedSubject = waitForClose();

    const passwordRef = React.useRef<HTMLInputElement>()
    const newPasswordRef = React.useRef<HTMLInputElement>()

    const [password, setPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>('Email');
    const [status, setStatus] = React.useState<string>(null);

    React.useEffect(() => {

        STORAGE.getAbonentInfo()
            .do(info => {
                setEmail(prev => prev = info.email)
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in Entry Setting'))

    }, [])

    const checkPasswords = () => {

        if (nothingToNull(password) && nothingToNull(newPassword)) {

            if (password === newPassword) {
                return true
            }
            else {
                setStatus(prev => prev = 'Пароли не совпадают!')
            }
        }
        else {
            setStatus(prev => prev = 'Заполните все поля!')
        }
    }

    const handlePasswordInputs = (e : React.ChangeEvent<HTMLInputElement>, setState :  React.Dispatch<React.SetStateAction<string>>) => setState(e.currentTarget.value);

    const handleChangePassword = () => {

        if(checkPasswords()) {

            setInProgress(prev => prev = true)

            CONNECTION.changePassword(createPasswordChangeRequest())
                .do(response => {
                    if (response.success) {
                        handleSuccessResponse()
                    }
                })
                .delay(2000)
                .do(() => setStatus(prev => prev = null))
                .takeUntil(closedSubject)
                .subscribe(logger.rx.subscribe('Error in Entry Setting'))
        }

    }

    const handleEnterPressEvent = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (document.activeElement === passwordRef.current) {
                newPasswordRef.current.focus()
            }
            else if (document.activeElement === newPasswordRef.current) {
                handleChangePassword()
            }
        }
    }

    const handleSuccessResponse = () => {
        setStatus(prev => prev = 'Пароль успешно изменен!')
        setPassword(prev => prev = '')
        setNewPassword(prev => prev = '')
        setInProgress(prev => prev = false)
    }

    const createPasswordChangeRequest = () : ChangePasswordRequest => ({
        password : newPassword
    })

    return (
        <div onKeyPress={handleEnterPressEvent} className="EntrySetting">
            <div className="title">Настройки входа</div>
            <div className="change-setting">
                <div className="left-block">
                    <div className='label'>Пароль</div>
                    <input autoComplete='new-password' ref={passwordRef} onChange={(e) => handlePasswordInputs(e, setPassword)} value={password} disabled={inProgress} placeholder='Пароль' className='input' type="password"/>
                    <input autoComplete='new-password' ref={newPasswordRef} onChange={(e) => handlePasswordInputs(e, setNewPassword)} value={newPassword} disabled={inProgress} placeholder='Новый пароль' className='input' type="password"/>
                    <div className="dont-remember">Не помню пароль</div>
                    <Button disabled={inProgress} func={handleChangePassword} text={'Изменить'} className='button-change' />
                    <div className='status'>{status}</div>
                </div>
                <div className="right-block">
                    <div className='label'>E-mail</div>
                    <input autoComplete='new-password' placeholder={email} className='input' type="email"/>
                </div>
            </div>
        </div>
    )
}
