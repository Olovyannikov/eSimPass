import * as React from 'react';

import { PrivateWizard } from '../../../redux/State';
import { STATE_API } from '../../../redux/StateApi';
import { ConfirmPurchase } from './confirmPurchase/ConfirmPurchase';
import { CreateDevice } from './createDevice/CreateDevice';
import { DeleteDevice } from './deleteDevice/DeleteDevice';
import { WaitForPayment } from './waitForPayment/WaitForPayment';

interface PrivateStageModals {
    state : PrivateWizard
}

export const Modal = (props : PrivateStageModals ) => {

    const showModal = () => {
        if (props.state.stage === 'waitForPayment') {
            return <WaitForPayment />
        }
        else if (props.state.stage === 'deleteDevice') {
            return <DeleteDevice deviceId={props.state.device.deviceId} deviceName={props.state.device.deviceName} />
        }
        else if (props.state.stage === 'addDevice') {
            return <CreateDevice />
        }
        else if (props.state.stage === 'buyQrCode') {
            return <ConfirmPurchase />
        }
    }

    const preventClosedWizard = () => {
        if (props.state.stage !== 'waitForPayment') {
            STATE_API.hideAuthWizard()
        }
    }

    return (
        <div className="Modals" onClick={preventClosedWizard}>
            {showModal()}
        </div>
    )
}
