import * as React from 'react';

import { STATE_API } from 'redux/StateApi';
import { img_crossMobile } from 'resources/images';
import { CheckBtn } from './checkBtn/CheckBtn';
import { Select } from './select/Select';
import { supportedEsimDevices, Brands } from './supportedEsimDevices';

export const CheckDevice = () => {

    const [type, setType] = React.useState<string>(null);
    const [brand, setBrand] = React.useState<string>(null);
    const [device, setDevice] = React.useState<string>(null);
    const [checked, setChecked] = React.useState<boolean>(false);

    React.useEffect(() => {
        setBrand(null);
        setChecked(false);
    }, [type])

    React.useEffect(() => {
        setDevice(null);
        setChecked(false);
    }, [brand])

    const closeModal = () => STATE_API.hideAuthWizard();

    // const isOpen = () => type || brand || device ? true : false;

    const handleBrandByType = () : string[] => {
        if (type) {
            return supportedEsimDevices[type].reduce((acc : string[], value : any) => {
                return [...acc, value.brand];
            }, [])
        }
    }

    const handleDeviceByBrandType = () : string[] => {
        if (brand && type) {
            const arrayDevices : Brands = supportedEsimDevices[type].find((el : Brands) => el.brand === brand);

            if (arrayDevices) {
                return [...arrayDevices.devices];
            }
        }
    }

    const checkActiveButton = () => type && brand && device ? false : true;

    const finishChecking = () => setChecked(prev => prev = true);

    const renderFinishedCheking = () => {
        if (checked) {
            return (
                <div className='success-block'>
                    <div className="success-checked">{device} поддержвивает eSIM и готов к подключению</div>
                    <div onClick={() => STATE_API.showPublicWizard('register')} className="connect-button">
                        <div>Подключить eSIM pass</div>
                    </div>
                </div>
            )
        }
        else {
            return <div className="text-below">Если устройства нет среди предложенных вариантов, то уточни наличие eSIM у своего производителя</div>
        }
    }

    return (
        <div onClick={(e) => e.stopPropagation ()} className={`CheckDevice`}>
            <img onClick={closeModal} className='close' src={img_crossMobile} alt="Close"/>
            <h2 className="title">eSIM и мое устройство совместимы?</h2>
            <div className='parameters-title'>Укажите параметры устройтсва</div>
            <div className="selects-block">
                <Select setValue={setType} defaultText='Выбери тип устройства' text={type} options={['Смартфон','Планшет','Часы']} />
                <Select setValue={setBrand} defaultText='Выбери производителя' text={brand} disabled={Boolean(!type)} options={handleBrandByType()} />
                <Select setValue={setDevice} defaultText='Выбери модель' text={device} disabled={Boolean(!brand)} options={handleDeviceByBrandType()} />
                <CheckBtn onClick={finishChecking} disabled={checkActiveButton()} />
            </div>
            {renderFinishedCheking()}
        </div>
    )

}
