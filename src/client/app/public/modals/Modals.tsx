import * as React from 'react';
import { STATE_API } from '../../../redux/StateApi';

export const Modals = () => {
    return (
        <div className="Modals" onClick={() => STATE_API.hideAuthWizard()}>
            
        </div>
    )
}
