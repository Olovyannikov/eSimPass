import * as React from 'react';
import { img_mobileAppStore, img_googlePlay, img_bannerIphone, img_crossMobile, img_appstore } from '../../../../../../../resources/images';

export const Banner = () => {

    const bannerRef = React.useRef(null);

    const handleCloseBanner = () => bannerRef.current.style.display = 'none';

    const returnStoreImg = () => {
        if (window.navigator.userAgent.indexOf('AppleWebKit') > -1) {
            return img_appstore
        }
        else {
            return img_googlePlay
        } 
    }
    return (
        <div className="Banner" ref={bannerRef}>
            <div className="left-block">
                <div className="text">
                    Управляйте пакетами всей семьи и контролируйте расходы в приложении на вашем смартфоне
                </div>
                <img className='download' src={returnStoreImg()} alt="Download"/>
            </div>
            <img className='phone-img' src={img_bannerIphone} alt="Phone"/>
            <img onClick={handleCloseBanner} className='cross-close' src={img_crossMobile} alt="Close"/>
        </div>
    )
}
