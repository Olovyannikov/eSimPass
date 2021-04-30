import * as React from "react";

import { STATE_API } from '../../../../../../../redux/StateApi';
import { img_lk } from "../../../../../../../resources/images";
import { STORAGE } from "../../../../../../../StorageAdapter";
import Router from 'next/router';

export const HeaderBlock = () => {

    const handlerClickCabinet = () => {
        if (STORAGE.getToken()) {
            Router.push('/cabinet')
        }
        else {
            return STATE_API.showPublicWizard('login');
        }
    }

    return (
        <table className="HeaderBlock">
            <tbody>
                <tr>
                    <td align="right">
                        <div onClick={handlerClickCabinet} className='link-top'>Личный кабинет</div>
                        <div>
                            <img className='lk' src={img_lk} alt="Личный кабинет"/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
