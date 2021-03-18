import * as React from 'react';

import { MenuButton } from '../MenuWrapper';
import { BuyQrCode } from './menuItems/buyQrCode/BuyQrCode';
import { Loyalty } from './menuItems/loyalty/Loyalty';
import { Settings } from './menuItems/settings/Settings';

interface MenuActiveItemModel {
    activeItem : MenuButton
}

export const MenuActiveItem = (props : MenuActiveItemModel) => {

    const showActiveItem = () => {
        if (props.activeItem === 'buyQr') {
            return <BuyQrCode />
        } 
        else if (props.activeItem === 'detail') {
            return <div>DETAILED</div>
        }
        else if (props.activeItem === 'devices') {
            return <div>DEVICES</div>
        }
        else if (props.activeItem === 'loyalty') {
            return <Loyalty />
        }
        else if (props.activeItem === 'settings') {
            return <div>SETTINGS</div>
        }
        else if (props.activeItem === 'support') {
            return <div>SUPPORT</div>
        }
    }
    
    return (
        <div className="MenuActiveItem">
            {showActiveItem()}
        </div>
    )
}
