import * as React from 'react';
import { MenuItems } from '../../../../redux/StateApi';

import {MenuItem, IMenuItem } from '../../../components/menuItem/MenuItem';

export interface MenuProps {
    menuItems : IMenuItem[];
    active : MenuItems;
}

export const MenuBlock = (props : MenuProps) => {
    return (
        <div className="MenuBlock">
            {props.menuItems.map((el : IMenuItem, index : number) => (
                <MenuItem key={index} item={el} active={props.active} />
            ))}
        </div>
    )
}
