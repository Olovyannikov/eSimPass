import * as React from 'react';
import { STATE_API } from '../../../redux/StateApi';
import { SHOW_PUBLIC_WIZARD_MODE } from '../../../redux/State';
import { LoginDialog } from './login/LoginDialog';
import { RegistrationDialog } from './registration/RegistrationDialog';
import { VerifyDialog } from './verify/VerifyDialog';

export const Modals = (props : {mode : SHOW_PUBLIC_WIZARD_MODE} ) => {

    const showModal = () => {
        if (props.mode === 'login') {
            return <LoginDialog />
        } 
        else if (props.mode === 'register') {
            return <RegistrationDialog/>
        }
        else if (props.mode === 'verify') {
            return <VerifyDialog />
        }
    }

    return (
        <div className="Modals" onClick={STATE_API.hideAuthWizard}>
            {showModal()}
        </div>
    )
}
