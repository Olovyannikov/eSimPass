import * as React from 'react';
import { img_mainLogo } from 'resources/images';

export const Header = () => {
    return (
        <div className="Header">
            <div className="logo-block">
                <img className='logo' src={img_mainLogo} alt="EimPass" />
            </div>
            <div className="title">Безроуминговая связь для путешествий за границу</div>
        </div>
    )
}
