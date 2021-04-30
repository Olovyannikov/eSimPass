import * as React from "react";

import { STATE_API } from "../../../../../../../redux/StateApi";
import { img_girlMain } from "../../../../../../../resources/images";
import Image from 'next/image';


export const LogoBlock = () => {

    const handlerClickRegister = () => STATE_API.showPublicWizard('register');

    return (
        <table className="LogoBlock" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td>                    
                        <div className="left">
                            <div>
                                <div className="text">eSIM карта для путешествий</div>
                            </div>
                            <div className="connect">
                                <a>
                                    <div onClick={handlerClickRegister}>
                                        Подключить
                                    </div>
                                </a>
                            </div>
                        </div>
                    </td>
                    <td>  
                        {/* <Image src={'/girl1.png'} width='' height='' /> */}
                        <img src={img_girlMain} alt=""/>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

