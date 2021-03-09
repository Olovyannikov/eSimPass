import * as React from 'react';
import { MenuItems, STATE_API } from '../../../redux/StateApi';

export interface IMenuItem {
    icon : {
        active : string;
        disabled : string;
    };
    text : string;
    className : MenuItems;
}

export interface Props {
    item : IMenuItem
    active : MenuItems;
}



export const MenuItem = ({item, active} : Props) => {
    
    return (
        <div onClick={() => STATE_API.setMenuItem(item.className)} className={`MenuItem ${active === item.className ? 'active' : ''}`}>
            <div className='menu-item__wrap'>
                <div className='menu-item__img_icon'><img className={item.className} src={active === item.className ? item.icon.active : item.icon.disabled} alt="Icon"/></div>
                <div className="menu-item__text">{item.text}</div>
            </div>
        </div>
    )
}
