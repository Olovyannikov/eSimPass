import * as React from 'react';
import { PagesHolder } from './pages/PagesHolder';
import { State } from '../../../redux/State';
import { connect } from 'react-redux';
import { Modal } from './modals/Modal';
import { Navbar } from './pages/cabinet/blocks/navbar/Navbar';

const PrivateApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {
    
    const showWizard = () => {
        if (props.privateWizard) {
            return <Modal state={props.privateWizard} />
        }
    }

    return (
        <div className="PrivateApplication">
            <Navbar />
            <PagesHolder />
            {showWizard()}
        </div>
    )
}

const mapStateToProps = (state : State) => ({
    privateWizard : state.privateWizard,
})

export const PrivateApplication = connect(mapStateToProps)(PrivateApplicationImpl);

