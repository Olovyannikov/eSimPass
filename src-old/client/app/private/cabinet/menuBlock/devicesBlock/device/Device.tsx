import * as React from 'react';

import { WhoseDevice } from '../../../../../components/whoseDevice/WhoseDevice';
import { RateInfo } from '../../../../../components/rateInfo/RateInfo';
import { STATE_API } from '../../../../../../redux/StateApi';

import activeArrow from '../../../../../../img/red-cross.png';
import iphone from '../../../../../../img/iphone-11.png';
import { AmountRate } from '../../../../../components/amountRate/AmountRate';
import { ListDevicesResponse } from '../../../../../../generated/proto.web';
import { closeModal, dateUntil, openModal, percentOfPackage, setColorBar } from '../../../../../../codebase/utils';

export interface IProps {
    device : ListDevicesResponse.SuccessModel.DeviceModel;
}

export const Device = ({device} : IProps) => {

    const [activePackage, setActivePackage] = React.useState<boolean>(false)

    const checkActiveDevice = (device : ListDevicesResponse.SuccessModel.DeviceModel) => {
            for (let i in device.currentPack) {
                if (device.currentPack.hasOwnProperty(i)) {
                   return true
                }
                return false;
            } 
    }

    React.useEffect(() => {
       setActivePackage(checkActiveDevice(device))
    }, [])


     
    return (
        activePackage ? (<div className="Device">
            <div className="device__left-block">
                <WhoseDevice name={device.name.value} />
                <RateInfo operatorName={device.currentPack.rate.operatorName}/>
                <div className="device__price">
                    Стоимость {device.currentPack.price} ₽
                </div>
                <div className="progressBar small-bar">
                    <div className='bar' style={{width:`${percentOfPackage(Number(device.currentPack.quota), Number(device.currentPack.used))}%`, backgroundColor: setColorBar(percentOfPackage(Number(device.currentPack.quota), Number(device.currentPack.used)))}}></div>
                </div>
                <AmountRate quota={device.currentPack.quota} used={device.currentPack.used}/>
                <div className="until">Действует до <span className='date'>{dateUntil(device.currentPack.boughtDate, device.currentPack.duration).toLocaleDateString()}</span></div>
            </div>
            <div className="device__right-block">
                <div className='device__active-arrow' onClick={() => openModal('deleteDevice')}>   
                    <img className='device__img_icon-active-arrow' src={activeArrow} alt="icon-arrow"/>
                </div>
                <div className='device__iphone'>
                    <img className='device__img_icon-iphone11' src={iphone} alt="Iphone"/>
                </div>
            </div>
        </div>)
         : 
        (<div className="DeviceNotActive">
            <div className="device-not-active__left-block">
                <WhoseDevice name={device.name.value} />
                <RateInfo />
                <div className="device-not-active__dont-text">
                    Нет активного пакета
                </div>
            </div>
            <div className="device-not-active__right-block">
                <div className='device-not-active__active-arrow' onClick={() => openModal('deleteDevice')}>   
                    <img className='device-not-active__img_icon-active-arrow' src={activeArrow} alt="icon-arrow"/>
                </div>
                <div className='device-not-active__iphone'>
                    <img className='device-not-active__img_icon-iphone11' src={iphone} alt="Iphone"/>
                </div>
            </div>
        </div>)
    )
}
