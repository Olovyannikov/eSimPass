import * as React from 'react';

import {Link} from 'react-router-dom';

import person from '../../../../img/person.png';
import { STATE_API } from '../../../../redux/StateApi';

export const Navbar = (props : {login : string}) => {
    return (
        <div className="Navbar">
                <div className="navbar__left-nav">
                    <Link className="navbar__logo" to='/'>LOGO</Link>
                </div>
                <div className="navbar__right-nav">
                    <div className='navbar__languages'>
                        <span>Рус</span>
                        <span className='navbar__disabled'>Eng</span>
                    </div>
                    <img className='navbar__img_person' src={person} alt="User"/>
                    <div className='navbar__email' onClick={STATE_API.setLogout}>{props.login ? props.login : 'example@gmail.com' }</div>
                </div>
        </div>
    )
}
