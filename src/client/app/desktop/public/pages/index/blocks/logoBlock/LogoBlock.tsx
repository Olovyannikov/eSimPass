import * as React from "react";

import { STATE_API } from "../../../../../../../redux/StateApi";
import { img_girl1 } from "../../../../../../../resources/images";
import { STORAGE } from "../../../../../../../StorageAdapter";


export const LogoBlock = () => {

    const handlerClickRegister = () => STATE_API.showPublicWizard('register');

    return (
        <table className="LogoBlock" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td>                    
                        <div className="logo-block__left">
                            <div>
                                <div className="logo-block__text">eSIM карта для путешествий</div>
                            </div>
                            <div className="logo-block__connect">
                                <a>
                                    <div onClick={handlerClickRegister}>
                                        Подключить
                                    </div>
                                </a>
                            </div>
                        </div>
                    </td>
                    <td>  
                        <img src={img_girl1}/>                  
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
