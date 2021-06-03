import * as React from 'react';

import { STATE_API } from 'redux/StateApi';
import { img_crossMobile } from 'resources/images';
import { CheckBtn } from './checkBtn/CheckBtn';
import { Select } from './select/Select';

export const CheckDevice = () => {

    const closeModal = () => STATE_API.hideAuthWizard();

    return (
        <div onClick={(e) => e.stopPropagation ()} className="CheckDevice">
            <img onClick={closeModal} className='close' src={img_crossMobile} alt="Close"/>
            <h2 className="title">eSIM и мое устройство совместимы?</h2>
            <div className='parameters-title'>Укажите параметры устройтсва</div>
            <div className="selects-block">
                <Select text='Выбери тип устройства' options={['Смартфон','Планшет','Часы']} />
                <Select text='Выбери производителя' />
                <Select text='Выбери модель' />
                <CheckBtn />
            </div>
            <div className="text-below">Если устройства нет среди предложенных вариантов, то уточни наличие eSIM у своего производителя</div>
        </div>
    )
}

// const types = ['Смартфон','Планшет','Часы']

// const brands = ['Apple','Samsung',]

const smartPhones = {
    type : 'Смартфон',
    brands : [
        {
            type : 'Apple',
            phones: ['iPhone Xs', 'iPhone Xs Max','iPhone Xr', 'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Max', 'iPhone SE (2020)', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Mini', 'iPhone 12 Pro Max'],
        },
        {
            type : 'Samsung',
            phones : ['Samsung Galaxy S20', 'Samsung Galaxy S20+', 'Samsung Galaxy S20 Ultra', 'Samsung Galaxy S21', 'Samsung Galaxy S21+', 'Samsung Galaxy S21 Ultra','Samsung Galaxy Z Fold2', 'Samsung Fold 5G', 'Galaxy Z Flip']
        },
        {
            type : 'Google',
            phones : ['Google Pixel 5', 'Google Pixel 4', 'Google Pixel 4a', 'Google Pixel 4 XL', 'Google Pixel 3 XL', 'Google Pixel 2', 'Google Pixel 2X', 'Google Pixel 3A', 'Google Pixel 3A XL']
        },
        {
            type : 'Microsoft',
            phones : ['Microsoft Surface Duo 6']
        },
        {
            type : 'Huawei',
            phones : ['Huawei P40 Pro+', 'Huawei P40 Pro', 'Huawei P40'],
        },
        {
            type : 'LG', 
            phones : ['Nexus 5X', 'Nexus 6', 'Nexus 6P', 'LG V35 ThinQ (Dual SIM)', 'LG G7 ThinQ (Dual SIM)']
        },
        {
            type : 'Motorola',
            phones : ['Motorola RAZR', 'Moto G6 (Dual SIM)', 'Moto X4 (Dual SIM)']
        }
    ]
}

const tablets = {
    type : 'Планшет',
    brands : [
        {
            type : 'Apple',
            tablet : ['iPad pro 3', 'iPad mini 5', 'iPad Air (3 поколение)', 'iPad Air (4 поколение)', 'iPad Pro 12,9 дюйма (4 поколение)', 'iPad Pro 11 дюймов (2 поколение)', 'iPad Pro 12,9 дюйма (3 поколение)','iPad Pro 11 дюймов (1 поколение)','iPad (7 поколение)', 'iPad (8 поколение)']
        },
        {
            type : 'Microsoft',
            tablet : ['Surface Pro X', 'Microsoft Surface Go 2', 'Microsoft Surface Pro 5 (см. конфиг)', 'Microsoft Surface Pro 6 (см. конфиг)']
        }
    ]
}

const watches = {
    type : 'Часы',
    brands : [
        {
            type : 'Apple',
            watches : ['Apple Watch серии 3 (с сотовой связью)', 'Apple Watch серии 4 (с сотовой связью)', 'Apple Watch серии 5 (с сотовой связью)', 'Apple Watch серии 6 (с сотовой связью)']
        },
        {
            type : 'Samsung',
            watches : ['Samsung Galaxy Gear S3', 'Samsung Galaxy Watch LTE', 'Samsung Galaxy Watch Active 2', 'Samsung Gear S2 3G Sport']
        },
        {
            type : 'Xiaomi',
            watches : ['Xiaomi Smartwatch', 'Huami Amazfit Verge 2 (Nexo)', 'Amazfit Nexo Marvel Edition', 'Amazfit Smart Watch 2']
        },
        {
            type : 'Huawei', 
            watches : ['Huawei Watch 2 Pro']
        }
    ]
}
