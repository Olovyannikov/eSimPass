import * as React from 'react';

import { BuyPackDialog } from './buyPack/BuyPackDialog';
import { PrivateWizard } from '../../../redux/State';
import { STATE_API } from '../../../redux/StateApi';
import { ConfirmPurchase } from './confirmPurchase/ConfirmPurchase';
import { CreateDevice } from './device/createDevice/CreateDevice';
import { DeleteDevice } from './device/deleteDevice/DeleteDevice';
import { WaitForPayment } from './waitForPayment/WaitForPayment';

interface PrivateStageModals {
    state : PrivateWizard;
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
        else if (props.state.stage === 'buyPack') {
            return <BuyPackDialog pack={props.state.pack} />
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
