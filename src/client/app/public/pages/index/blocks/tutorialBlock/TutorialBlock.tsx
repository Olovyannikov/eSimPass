import * as React from 'react';


import { img_appstore, img_googlePlay, img_phone, img_qr, img_appGallery } from './../../../../../../resources/images';

export const TutorialBlock = () => {

    return (
        <div className="TutorialBlock">
            <div className="tutorial-block__left">
                <div className="tutorial-block__top">
                    <h1 className='tutorial-block__title'>Как подключить eSIM?</h1>
                    <div className='tutorial-block__text'>Сразу после заявки вы получите QR код</div>
                    <div className='tutorial-block__text'>Необходимо отсканировать QR код смартфоном и следовать указаниям</div>
                    <div className='tutorial-block__text'>Скачать приложение eSIM Travel на смартфон</div>
                    <div className='tutorial-block__text'>В приложение купить необходимый тариф</div>
                    </div>
                <div className="tutorial-block__bottom">
                    <div className="tutorial-block__left-qr">
                        <img className='tutorial-block__img_appstore' src={img_appstore} alt="Download Apstore"/>
                        <img className='tutorial-block__img_qr-img' src={img_qr} alt="QR"/>
                    </div>
                    <div className="tutorial-block__qr">
                        <img className='tutorial-block__img_googlePlay' src={img_googlePlay} alt="Download Google Play"/>
                        <img className='tutorial-block__img_qr-img' src={img_qr} alt="QR"/>
                    </div>
                    <div className="tutorial-block__qr">
                        <img className='tutorial-block__img_googlePlay' src={img_appGallery} alt="Download Google Play"/>
                        <img className='tutorial-block__img_qr-img' src={img_qr} alt="QR"/>
                    </div>
                </div>
            </div>
            <div className="tutorial-block__right">
                <img className='tutorial-block__img_phone' src={img_phone} alt="eSim Travel"/>
            </div>
        </div>
    )
}
