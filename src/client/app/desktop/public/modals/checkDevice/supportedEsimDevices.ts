interface SupportedEsimDevicesModel {
    'Часы' : Brands[]
    'Планшет' : Brands[]
    'Смартфон' : Brands[]
}

interface Brands {
    brand : string;
    devices : string[];
}

export const supportedEsimDevices : SupportedEsimDevicesModel = {
    'Часы' : [
        {
            brand : 'Apple',
            devices : ['Apple Watch серии 3 (с сотовой связью)', 'Apple Watch серии 4 (с сотовой связью)', 'Apple Watch серии 5 (с сотовой связью)', 'Apple Watch серии 6 (с сотовой связью)']
        },
        {
            brand : 'Samsung',
            devices : ['Samsung Galaxy Gear S3', 'Samsung Galaxy Watch LTE', 'Samsung Galaxy Watch Active 2', 'Samsung Gear S2 3G Sport']
        },
        {
            brand : 'Xiaomi',
            devices : ['Xiaomi Smartwatch', 'Huami Amazfit Verge 2 (Nexo)', 'Amazfit Nexo Marvel Edition', 'Amazfit Smart Watch 2']
        },
        {
            brand : 'Huawei', 
            devices : ['Huawei Watch 2 Pro']
        }
    ],
    'Планшет' :  [
        {
            brand : 'Apple',
            devices : ['iPad pro 3', 'iPad mini 5', 'iPad Air (3 поколение)', 'iPad Air (4 поколение)', 'iPad Pro 12,9 дюйма (4 поколение)', 'iPad Pro 11 дюймов (2 поколение)', 'iPad Pro 12,9 дюйма (3 поколение)','iPad Pro 11 дюймов (1 поколение)','iPad (7 поколение)', 'iPad (8 поколение)']
        },
        {
            brand : 'Microsoft',
            devices : ['Surface Pro X', 'Microsoft Surface Go 2', 'Microsoft Surface Pro 5 (см. конфиг)', 'Microsoft Surface Pro 6 (см. конфиг)']
        }
    ],
    'Смартфон' : [
        {
            brand : 'Apple',
            devices: ['iPhone Xs', 'iPhone Xs Max','iPhone Xr', 'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Max', 'iPhone SE (2020)', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Mini', 'iPhone 12 Pro Max'],
        },
        {
            brand : 'Samsung',
            devices : ['Samsung Galaxy S20', 'Samsung Galaxy S20+', 'Samsung Galaxy S20 Ultra', 'Samsung Galaxy S21', 'Samsung Galaxy S21+', 'Samsung Galaxy S21 Ultra','Samsung Galaxy Z Fold2', 'Samsung Fold 5G', 'Galaxy Z Flip']
        },
        {
            brand : 'Google',
            devices : ['Google Pixel 5', 'Google Pixel 4', 'Google Pixel 4a', 'Google Pixel 4 XL', 'Google Pixel 3 XL', 'Google Pixel 2', 'Google Pixel 2X', 'Google Pixel 3A', 'Google Pixel 3A XL']
        },
        {
            brand : 'Microsoft',
            devices : ['Microsoft Surface Duo 6']
        },
        {
            brand : 'Huawei',
            devices : ['Huawei P40 Pro+', 'Huawei P40 Pro', 'Huawei P40'],
        },
        {
            brand : 'LG', 
            devices : ['Nexus 5X', 'Nexus 6', 'Nexus 6P', 'LG V35 ThinQ (Dual SIM)', 'LG G7 ThinQ (Dual SIM)']
        },
        {
            brand : 'Motorola',
            devices : ['Motorola RAZR', 'Moto G6 (Dual SIM)', 'Moto X4 (Dual SIM)']
        }
    ]
}
