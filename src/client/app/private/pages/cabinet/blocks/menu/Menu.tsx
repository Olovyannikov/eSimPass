import * as React from 'react';

import {img_activeChange, img_activeDetail, img_activeSettings, img_activeLoyalty, img_activeDevices, img_activeSupport, img_settings, img_detail, img_support, img_loyalty, img_change, img_devices} from '../../../../../../resources/images';
import { MenuItem } from './menuItem/MenuItem';

export const Menu = () => {

    const toggleActive = (menuItem : string) => {
        menuItems.map(el => {
            if (el.active === true) {
                el.active = false
                console.log('active',el.className);
                
            } 
            else if (menuItem === el.className) {
                el.active = true;
                console.log('disabled',el.className);
            }
        })
    }

    const [menuItems, setMenuItems] = React.useState<MenuItemModel[]>(items);

    return (
        <div className="Menu">
            {menuItems.map((el : MenuItemModel, index : number) => (
                <MenuItem key={index} item={el} toggleActive={toggleActive}  />
            ))}
        </div>
    )
}

export type MenuItems = 'devices' | 'detail' | 'change' | 'loyalty' | 'support' | 'settings';

export interface MenuItemModel {
    icon : {
        active : string;
        disabled : string;
    };
    text : string;
    className : MenuItems;
    active : boolean;
}

const items : MenuItemModel[] = [{
    icon : {
        active : img_activeDevices,
        disabled : img_devices
    },
    text : 'Подключенные устройства',
    className : 'devices',
    active : true,
}, {
    icon : {
        active : img_activeDetail,
        disabled : img_detail
    },
    text : 'Детализация',
    className : 'detail',
    active : false
},{
    icon : {
        active : img_activeChange,
        disabled : img_change,
    },
    text : 'Купить QR-код',
    className : 'change',
    active : false
},{
    icon : {
        active : img_activeLoyalty,
        disabled : img_loyalty,
    },
    text : 'Программа лояльности',
    className : 'loyalty',
    active : false
}, {
    icon : {
        active : img_activeSupport,
        disabled : img_support
    },
    text : 'Поддержка',
    className : 'support',
    active : false
}, {
    icon : {
        active : img_activeSettings,
        disabled : img_settings
    },
    text : 'Настройки',
    className : 'settings',
    active : false
}]
