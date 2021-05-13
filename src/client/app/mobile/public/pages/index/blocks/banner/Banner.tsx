import * as React from 'react';
import { img_mobileAppStore, img_googlePlay, img_bannerIphone, img_crossMobile, img_appstore } from '../../../../../../../resources/images';

export const Banner = () => {
    
    const [img, setImg] = React.useState<string>('')

    const bannerRef = React.useRef(null);

    const handleCloseBanner = () => bannerRef.current.style.display = 'none';

    React.useEffect(() => {
        if (window.navigator.userAgent.search(/(iPhone|iPad)/) > -1) {
            setImg(prev => prev = img_appstore)
        }
        else {
            setImg(prev => prev = img_googlePlay)
        } 
    }, [img])


    return (
        <div className="Banner" ref={bannerRef}>
            <div className="left-block">
                <div className="text">
                    Управляйте пакетами всей семьи и контролируйте расходы в приложении на вашем смартфоне
                </div>
                <img className='download' src={img}/>
            </div>
            <img className='phone-img' src={img_bannerIphone} alt="Phone"/>
            <img onClick={handleCloseBanner} className='cross-close' src={img_crossMobile} alt="Close"/>
        </div>
    )
}
