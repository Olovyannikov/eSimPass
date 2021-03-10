import * as React from 'react';
import { STATE_API } from '../../../redux/StateApi';
import { SHOW_AUTH_WIZARD_MODE } from '../../../redux/State';
import { LoginDialog } from './login/LoginDialog';
import { RegistrationDialog } from './registration/RegistrationDialog';

export const Modals = (props : {mode : SHOW_AUTH_WIZARD_MODE} ) => {

    const showModal = () => {
        if (props.mode === 'login') {
            return <LoginDialog />
        } 
        else if (props.mode === 'register') {
            return <RegistrationDialog />
        }
    }

    return (
        <div className="Modals" onClick={STATE_API.hideAuthWizard}>
            {showModal()}
        </div>
    )
}
