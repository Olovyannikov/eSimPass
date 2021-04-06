import * as React from 'react';
import { img_mobileAppStore, img_bannerIphone, img_crossMobile } from '../../../../../../../resources/images';

export const Banner = () => {

    const bannerRef = React.useRef(null);

    const handleCloseBanner = () => bannerRef.current.style.display = 'none';

    return (
        <div className="Banner" ref={bannerRef}>
            <div className="left-block">
                <div className="text">
                    Управляйте пакетами всей семьи и  контролируйте расходы в приложении на вашем смартфоне
                </div>
                <img className='download' src={img_mobileAppStore} alt="Download"/>
            </div>
            <img className='phone-img' src={img_bannerIphone} alt="Phone"/>
            <img onClick={handleCloseBanner} className='cross-close' src={img_crossMobile} alt="Close"/>
        </div>
    )
}
