import * as React from 'react';
import { PagesHolder } from './pages/PagesHolder';
import { useParams, useLocation } from 'react-router-dom';
import { State } from '../../redux/State';
import { connect } from 'react-redux';
import { Modal } from './modals/Modal';
import { STATE_API } from '../../redux/StateApi';

export interface PaymentIdModel {
    paymentId : string;
}

const PrivateApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {

    const { paymentId } = useParams<PaymentIdModel>();
    const {search} = useLocation()

    const showWizard = () => {
        if (props.privateWizard) {
            return <Modal mode={props.privateWizard} />
        }
    }

    React.useEffect(() => {

        if (search) {
            STATE_API.showPrivateWizard('waitForPayment');
        } 

    }, [])

    return (
        <div className="PrivateApplication">
            <PagesHolder />
            { showWizard() }
        </div>
    )
}

const mapStateToProps = (state : State) => ({
    privateWizard : state.privateWizard
})

export const PrivateApplication = connect(mapStateToProps)(PrivateApplicationImpl);
