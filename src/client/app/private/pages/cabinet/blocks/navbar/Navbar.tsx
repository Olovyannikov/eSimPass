import * as React from 'react';

import { Link } from 'react-router-dom';
import { img_person } from '../../../../../../resources/images';
import { STORAGE } from '../../../../../../StorageAdapter';

export const Navbar = () => {

    const handleLogout = () => {
        STORAGE.deleteToken();
        window.location.reload();
    }

    return (
        <div className="Navbar">
            <div className="left-nav">
                <Link className="logo" to='/'>LOGO</Link>
            </div>
            <div className="right-nav">
                <img className='img_person' src={img_person} alt="User"/>
                <div className="email">example@gmail.com</div>
                <div onClick={handleLogout} className="logout">Logout</div>
            </div>
        </div>
    )
}
