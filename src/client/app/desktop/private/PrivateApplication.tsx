import * as React from 'react';
import { PagesHolder } from './pages/PagesHolder';
import { useLocation } from 'react-router-dom';
import { State } from '../../../redux/State';
import { connect } from 'react-redux';
import { Modal } from './modals/Modal';
import { STATE_API } from '../../../redux/StateApi';
import { Navbar } from './pages/cabinet/blocks/navbar/Navbar';


const PrivateApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {

    const { search } = useLocation();

    const showWizard = () => {
        if (props.privateWizard) {
            return <Modal state={props.privateWizard} />
        }
    }

    React.useEffect(() => {

        if (search) {
            STATE_API.showPrivateWizard('waitForPayment');
        } 

    }, [])

    return (
        <div className="PrivateApplication">
            <Navbar />
            <PagesHolder />
            { showWizard() }
        </div>
    )
}

const mapStateToProps = (state : State) => ({
    privateWizard : state.privateWizard
})

export const PrivateApplication = connect(mapStateToProps)(PrivateApplicationImpl);

