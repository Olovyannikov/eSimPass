import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/State';
import {useOnClickOutside} from '../../hooks';
import { DeviceDetail } from './deviceDetail/DeviceDetail';
import { Registration } from './registration/Registration';
import { Login } from './login/Login';
import { TopUpQr } from './topUpQr/TopUpQr';
import { DeleteDevice } from './deleteDevice/DeleteDevice';


export const Modals = () => {
    return (
        <div className="Modals">
            <ShowModals />
        </div>
    )
}

const ShowModalsImpl = ({modal} : State) => {

    const ref = React.useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = React.useState(false)

    useOnClickOutside(ref, () => setIsOpen(false))
    
    if (modal === 'registration') {
        return <div ref={ref}><Registration /></div>
    } 
    else if (modal === 'topUpQr') {
        return <div ref={ref}><TopUpQr /></div>
    } 
    else if (modal === 'login') {
        return <div ref={ref}><Login /></div>
    }
    else if (modal === 'deleteDevice') {
        return <div ref={ref}><DeleteDevice /></div>;
    }
    else return null;
}

const ShowModals = connect((state : State) => ({
    modal : state.modal
}))(ShowModalsImpl)
