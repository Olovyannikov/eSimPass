import * as React from 'react';

import {img_buyQr, img_activeDetail, img_activeSettings, img_activeLoyalty, img_activeDevices, img_activeSupport, img_settings, img_detail, img_support, img_loyalty, img_activeBuyQr, img_devices} from '../../../../../../../resources/images';
import { MenuNav } from './menuNav/MenuNav';
import { MenuActiveItem } from './menuActiveItem/MenuActiveItem';

export const MenuWrapper = () => {

    const [menuButton, setMenuButton] = React.useState<MenuButtonModel[]>(menuButtons);

    const filterActiveMenuItem = (items : MenuButtonModel[]) => {
        return items.filter(el => el.active)[0].className
    }

    return ( 
        <div className="MenuWrapper">
            <MenuNav menuButtons={menuButton} setMenuButtons={setMenuButton} />
            <MenuActiveItem activeItem={filterActiveMenuItem(menuButton)}/>
        </div>
    )
}

export type MenuButton = 'devices' | 'detail' | 'buyQr' | 'loyalty' | 'support' | 'settings';

export interface MenuButtonModel {
    icon : {
        active : string;
        disabled : string;
    };
    text : string;
    className : MenuButton;
    active : boolean;
}

const menuButtons : MenuButtonModel[] = [{
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
        active : img_activeBuyQr,
        disabled : img_buyQr,
    },
    text : 'Купить QR-код',
    className : 'buyQr',
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

