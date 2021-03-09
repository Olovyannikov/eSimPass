import * as React from "react";

import { STATE_API } from '../../../../../../redux/StateApi';
import { img_lk } from "../../../../../../resources/images";

export const HeaderBlock = () => {

    return (
        <table className="HeaderBlock">
            <tbody>
                <tr>
                    <td align="right">
                        <div onClick={() => STATE_API.showAuthWizard('login')} className='link-top'>Личный кабинет</div>
                        <div>
                            <img className='lk' src={img_lk} alt="Личный кабинет"/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
