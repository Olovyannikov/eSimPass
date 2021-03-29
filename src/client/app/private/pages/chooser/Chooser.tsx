import * as React from 'react';

import { Navbar } from '../cabinet/blocks/navbar/Navbar';
import { ChooserWrapper } from './chooserWrapper/ChooserWrapper';

export const Chooser = () => {

    return (
        <div className="Chooser">
            <Navbar />
            <ChooserWrapper />
        </div>
    )
}
