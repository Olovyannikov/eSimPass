import * as React from "react";

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { img_lk } from "../../../../../images";
import { State } from "../../../../../../redux/State";
import { STATE_API } from "../../../../../../redux/StateApi";
import { openModal } from "../../../../../../codebase/utils";

export const HeaderBlock = () => {

    const login = useSelector(( {auth} : State) => auth.login)

    const checkUserAuth = () => {
        if (login) {
            return <Link className='link-top' to='/cabinet'>{login}</Link>
        } else {
            return <div className='link-top' onClick={() => openModal('login')}>Личный кабинет</div>
        }
    }

    return (
        <table className="HeaderBlock">
            <tbody>
                <tr>
                    <td align="right">
                        {checkUserAuth()}
                        {/* <Link className='link-top' to='/cabinet'>{login ? login : 'Личный кабинет'}</Link> */}
                        <div>
                            <img className='lk' src={img_lk} alt="Личный кабинет"/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
