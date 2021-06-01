import * as React from 'react';

import Link from 'next/link';
import { img_mainLogo, img_lk } from 'resources/images';
import { STORAGE } from 'StorageAdapter';
import { useRouter } from 'next/router';
import { STATE_API } from 'redux/StateApi';

export const Navbar = () => {

    const router = useRouter();

    const handlerClickCabinet = () => {
        if (STORAGE.getToken()) {
            router.push('/cabinet');
        }
        else {
            return STATE_API.showPublicWizard('login');
        }
    }

    
    return (
        <div className="Navbar">
            <img className='logo' src={img_mainLogo} alt="esim-pass" />
            <Link href='/'>
                <a className='to-main'>На главную</a>
            </Link>
            <div onClick={handlerClickCabinet} className='to-cabinet'>Личный кабинет</div>
            <img className='lk' src={img_lk} alt="Личный кабинет"/>
        </div>
    )
}
