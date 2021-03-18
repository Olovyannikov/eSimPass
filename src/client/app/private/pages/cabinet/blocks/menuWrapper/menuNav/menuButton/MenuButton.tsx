import * as React from 'react';

import { MenuButtonModel } from '../../MenuWrapper';

interface ButtonProps {
    button : MenuButtonModel;
    setActive : React.Dispatch<React.SetStateAction<MenuButtonModel[]>>;
}

export const MenuButton = (props : ButtonProps) => {

    const showActiveClass = () => props.button.active ? 'active' : '';

    const showActiveImage = () => props.button.active ? props.button.icon.active : props.button.icon.disabled;

    const setActiveMenu = () => {
        props.setActive(prev => {
            return prev.map(el => {
                if (el.className === props.button.className) {
                    return {
                        ...el,
                        active : true
                    }
                } 
                else {
                    return {
                        ...el,
                        active : false
                    }
                }
            })
        })
    }

    return (
        <div onClick={setActiveMenu} className={`MenuButton ${showActiveClass()}`}>
            <div className='wrap'>
                <div className='img_icon'><img className={props.button.className} src={showActiveImage()} alt="Icon"/></div>
                <div className="text">{props.button.text}</div>
            </div>
        </div>
    )
}
