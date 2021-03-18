import * as React from 'react';

import { MenuItemModel } from '../Menu';

interface ItemProps {
    item : MenuItemModel;
}

export const MenuItem = (props : ItemProps) => {

    const menuItemRef = React.useRef<HTMLDivElement>()

    const showActiveClass = () => props.item.active ? 'active' : '';

    const showActiveImage = () => props.item.active ? props.item.icon.active : props.item.icon.disabled;


    return (
        <div ref={menuItemRef} className={`MenuItem ${showActiveClass()}`}>
            <div className='wrap'>
                <div className='img_icon'><img className={props.item.className} src={showActiveImage()} alt="Icon"/></div>
                <div className="text">{props.item.text}</div>
            </div>
        </div>
    )
}
