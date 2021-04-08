import * as React from 'react';

import { Button } from '../../../components/buttons/Button';

interface VerifyRegistrationModel {
    handleRegistration? : () => void;
}

export const VerifyRegistration = (props : VerifyRegistrationModel) => {

    return (
        <div className="VerifyRegistration">
            <div className="title-success">Вам на почту отправлено письмо для подтверждения регистрации</div>
            <Button className='verify-button' func={props.handleRegistration} text='Отправить еще раз' />
        </div>
    )
}
