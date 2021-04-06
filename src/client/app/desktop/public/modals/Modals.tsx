import * as React from 'react';

import { STATE_API } from '../../../../redux/StateApi';
import { SHOW_PUBLIC_WIZARD_MODE } from '../../../../redux/State';
import { LoginDialog } from './login/LoginDialog';
import { RegistrationDialog } from './registration/RegistrationDialog';
import { VerifyRegistrationDialog } from './verify/verifyRegistration/VerifyRegistrationDialog';
import { PasswordRestoreDialog } from './restore/passwordRestore/PasswordRestoreDialog';
import { VerifyPasswordRestoreDialog } from './verify/verifyPasswordRestore/VerifyPasswordRestoreDialog';
import { ConnectQrCodeDialog } from './connectQrCode/ConnectQrCodeDialog';

export const Modals = (props : {mode : SHOW_PUBLIC_WIZARD_MODE} ) => {

    const showModal = () => {
        if (props.mode === 'login') {
            return <LoginDialog />
        } 
        else if (props.mode === 'register') {
            return <RegistrationDialog/>
        }
        else if (props.mode === 'verifyRegistration') {
            return <VerifyRegistrationDialog />
        }
        else if (props.mode === 'passwordRestore') {
            return <PasswordRestoreDialog />
        }
        else if (props.mode === 'verifyPasswordRestore') {
            return <VerifyPasswordRestoreDialog />
        }
        else if (props.mode === 'connectQrCode') {
            return <ConnectQrCodeDialog />
        }
    }

    return (
        <div className="Modals" onClick={STATE_API.hideAuthWizard}>
            {showModal()}
        </div>
    )
}
