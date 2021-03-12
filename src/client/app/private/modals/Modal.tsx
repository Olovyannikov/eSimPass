import * as React from 'react';
import { SHOW_PRIVATE_WIZARD_MODE } from '../../../redux/State';
import { STATE_API } from '../../../redux/StateApi';
import { WaitForPayment } from './waitForPayment/WaitForPayment';

export const Modal = (props : {mode : SHOW_PRIVATE_WIZARD_MODE} ) => {

    const showModal = () => {
        if (props.mode === 'waitForPayment') {
            return <WaitForPayment />
        }
    }

    const preventClosedWizard = () => {
        if (props.mode !== 'waitForPayment') {
            STATE_API.hideAuthWizard
        }
    }

    return (
        <div className="Modals" onClick={preventClosedWizard}>
            {showModal()}
        </div>
    )
}
