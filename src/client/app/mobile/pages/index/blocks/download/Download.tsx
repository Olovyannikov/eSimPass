import * as React from 'react';

import { img_mobileAppStore, img_googlePlay } from '../../../../../../resources/images';

export const Download = () => {

    React.useEffect(() => {
        console.log(navigator.userAgent);
        console.log(navigator.userAgent.toString().indexOf('iPhone'));
        
        
    }, [])

    const checkDeviceOS = () => {
        if (navigator.userAgent.indexOf('iPhone') > -1) {
            return img_mobileAppStore
        }
        else {
            return img_googlePlay
        }
    }

    return (
        <div className="Download">
            <div className="title">Скачать мобильное приложение </div>
            <div className="img">
                <img src={checkDeviceOS()} alt="Download"/>
            </div>
        </div>
    )
}
