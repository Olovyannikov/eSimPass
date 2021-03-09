import * as React from "react";

import { Link } from 'react-router-dom';
import { img_lk } from "../../../../../../resources/images";

export const HeaderBlock = () => {

    return (
        <table className="HeaderBlock">
            <tbody>
                <tr>
                    <td align="right">
                        <Link className='link-top' to='/cabinet'>{'Личный кабинет'}</Link>
                        <div>
                            <img className='lk' src={img_lk} alt="Личный кабинет"/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
