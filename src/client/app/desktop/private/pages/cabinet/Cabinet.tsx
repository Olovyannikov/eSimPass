import * as React from 'react';

import { Balance } from './blocks/balance/Balance';
import { Packages } from './blocks/packages/Packages';
import { Navbar } from './blocks/navbar/Navbar';
import { MenuWrapper } from './blocks/menuWrapper/MenuWrapper';


export const Cabinet = () => {

    return (
        <div className="Cabinet">
            <Navbar />
            <Balance />
            <Packages />
            <MenuWrapper />
        </div>
    )
}
