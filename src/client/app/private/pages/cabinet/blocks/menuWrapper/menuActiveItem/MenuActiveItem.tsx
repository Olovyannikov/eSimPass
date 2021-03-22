import * as React from 'react';

import { MenuButton } from '../MenuWrapper';
import { BuyQrCode } from './menuItems/buyQrCode/BuyQrCode';
import { Detailed } from './menuItems/detailed/Detailed';
import { Devices } from './menuItems/devices/Devices';
import { Loyalty } from './menuItems/loyalty/Loyalty';
import { Settings } from './menuItems/settings/Settings';
import { Support } from './menuItems/support/Support';

interface MenuActiveItemModel {
    activeItem : MenuButton
}

export const MenuActiveItem = (props : MenuActiveItemModel) => {

    const renderActiveItem = () => {
        if (props.activeItem === 'buyQr') {
            return <BuyQrCode />
        } 
        else if (props.activeItem === 'detail') {
            return <Detailed />
        }
        else if (props.activeItem === 'devices') {
            return <Devices />
        }
        else if (props.activeItem === 'loyalty') {
            return <Loyalty />
        }
        else if (props.activeItem === 'settings') {
            return <Settings />
        }
        else if (props.activeItem === 'support') {
            return <Support />
        }
    }
    
    return (
        <div className="MenuActiveItem">
            {renderActiveItem()}
        </div>
    )
}
