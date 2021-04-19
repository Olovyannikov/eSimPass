import * as React from 'react';

import { Balance } from './blocks/balance/Balance';
import { Packages } from './blocks/packages/Packages';
import { MenuWrapper } from './blocks/menuWrapper/MenuWrapper';


export const Cabinet = () => {

    return (
        <div className="Cabinet">
            <Balance />
            <Packages />
            <MenuWrapper />
        </div>
    )
}
