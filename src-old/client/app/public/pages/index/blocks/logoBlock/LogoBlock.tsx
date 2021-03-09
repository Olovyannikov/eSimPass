import * as React from "react";
import { openModal } from "../../../../../../codebase/utils";

import { img_girl1 } from "../../../../../images";


export const LogoBlock = () => {

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
                                    <div onClick={() => openModal('registration')}>
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
