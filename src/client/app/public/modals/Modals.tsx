import * as React from 'react';
import { STATE_API } from '../../../redux/StateApi';
import { SHOW_AUTH_WIZARD_MODE } from '../../../redux/State';
import { Login } from './login/Login';
import { Registration } from './registration/Registration';

export const Modals = (props : {mode : SHOW_AUTH_WIZARD_MODE} ) => {

    const showModal = () => {
        if (props.mode === 'login') {
            return <Login />
        } else if (props.mode === 'register') {
            return <Registration />
        }
    }

    return (
        <div className="Modals" onClick={STATE_API.hideAuthWizard}>
            {showModal()}
        </div>
    )
}
