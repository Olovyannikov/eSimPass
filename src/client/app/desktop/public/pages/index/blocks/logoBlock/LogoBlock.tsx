import * as React from "react";

import { STATE_API } from "../../../../../../../redux/StateApi";
import { img_girlMain, img_mainLogo } from "../../../../../../../resources/images";
import { STORAGE } from "StorageAdapter";
import { useRouter } from 'next/router';


export const LogoBlock = () => {

    const router = useRouter();

    const handlerClickRegister = () => {
        if (STORAGE.getToken()) {
            router.push('/cabinet')
        }
        else {
            STATE_API.showPublicWizard('register');
        }
    } 

    return (
        <table className="LogoBlock" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td>                    
                        <div className="left">
                            <div>
                                <div className="text">
                                    <img className='main-logo' src={img_mainLogo} alt="eSim" />
                                    <div>карта для путешествий</div>
                                </div>
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
                        <img src={img_girlMain} alt="eSIM"/>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

