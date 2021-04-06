import * as React from 'react';

import { MenuButtonModel } from '../MenuWrapper';
import { MenuButton } from './menuButton/MenuButton';

interface MenuNavProps {
    menuButtons : MenuButtonModel[];
    setMenuButtons : React.Dispatch<React.SetStateAction<MenuButtonModel[]>>;
}

export const MenuNav = (props : MenuNavProps) => {
    
    return (
        <div className="MenuNav">
            {props.menuButtons.map((el : MenuButtonModel, index : number) => (
                <MenuButton setActive={props.setMenuButtons} key={index} button={el} />
            ))}
        </div>
    )
}

