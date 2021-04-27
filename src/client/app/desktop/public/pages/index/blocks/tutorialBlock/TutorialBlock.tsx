import * as React from 'react';


import { img_appstore, img_googlePlay, img_phone, img_qr, img_appGallery } from '.././../../../../../../resources/images';

export const TutorialBlock = () => {

    return (
        <div className="TutorialBlock">
            <div className="left">
                <div className="top">
                    <h1 className='title'>Как подключить eSIM?</h1>
                    <div className='text'>Сразу после заявки вы получите QR код</div>
                    <div className='text'>Необходимо отсканировать QR код смартфоном и следовать указаниям</div>
                    <div className='text'>Скачать приложение eSIM Pass на смартфон</div>
                    <div className='text'>В приложение купить необходимый тариф</div>
                    </div>
                <div className="bottom">
                    <div className="left-qr">
                        <img className='img_appstore' src={img_appstore} alt="Download Apstore"/>
                        <img className='img_qr-img' src={img_qr} alt="QR"/>
                    </div>
                    <div className="qr">
                        <img className='img_googlePlay' src={img_googlePlay} alt="Download Google Play"/>
                        <img className='img_qr-img' src={img_qr} alt="QR"/>
                    </div>
                    <div className="qr">
                        <img className='img_googlePlay' src={img_appGallery} alt="Download Google Play"/>
                        <img className='img_qr-img' src={img_qr} alt="QR"/>
                    </div>
                </div>
            </div>
            <div className="right">
                <img className='img_phone' src={img_phone} alt="eSim Pass"/>
            </div>
        </div>
    )
}
