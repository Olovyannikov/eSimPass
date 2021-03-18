import { ListDevicesResponse, PACK_DURATION } from "../generated/proto.web";


export const devicesData : ListDevicesResponse.SuccessModel.DeviceModel[] = [{
    deviceId : '1',
    created : '01/25/2021',
    name : {
        value : 'Я',
    },
    packs : [{
        boughtDate : '01/25/2021',
        current : '',
        duration : PACK_DURATION.WEEK,
        price : '7',
        quota : '524288000',
        rate : {
            rateId : '1',
            price : '0.01',
            countryName : 'Австралия',
            operatorName : 'Operator5',
            countryCode : '61'
        },
        used : '157286400',
    },{
        boughtDate : '02/03/2021',
        current : '',
        duration : PACK_DURATION.DAY,
        price : '1.5',
        quota : '104857600',
        rate : {
            rateId : '21',
            price : '0.01',
            countryName : 'Алжир',
            operatorName : 'Operator25',
            countryCode : '213'
        },
        used : '104857600',
    },{
        boughtDate : '02/05/2021',
        current : '',
        duration : PACK_DURATION.TWO_WEEKS,
        price : '13.31',
        quota : '1073741824',
        rate : {
            rateId : '536',
            price : '0.01',
            countryName : 'Марокко',
            operatorName : 'Operator540',
            countryCode : '212'
        },
        used : '2147483648',
    }],
    lpaUrl : 'lpa-3',
    currentPack : {
        boughtDate : '02/25/2021',
        current : '',
        duration : PACK_DURATION.MONTH,
        price : '58.88',
        quota : '5368709120',
        rate : {
            rateId : '346',
            price : '0.01',
            countryName : 'Италия',
            operatorName : 'Mama mia',
            countryCode : '39'
        },
        used : '1174405120',
    }
},{
    deviceId : '2',
    created : '02/20/2021',
    currentPack : {
        boughtDate : '02/21/2021',
        current : '',
        duration : PACK_DURATION.WEEK,
        price : '7',
        quota : '524288000',
        rate : {
            rateId : '1011',
            countryCode : '7',
            countryName : 'Россия',
            operatorName : 'Megafon',
            price : '5888',
        },
        used : '514288000',
    },
    lpaUrl : 'lpaUrl-2',
    name : {
        value : 'Сын'
    },
    packs : [],
},
// {
//     deviceId : '3',
//     created : '02/19/2021',
//     currentPack : {},
//     lpaUrl : 'lpaUrl-1',
//     name : {
//         value : 'Супруга',
//     },
//     packs : [],
// }
,{
    deviceId : '4',
    created : '07/15/2020',
    currentPack : {
        boughtDate : '02/21/2021',
        current : '',
        duration : PACK_DURATION.TWO_WEEKS,
        price : '1.5',
        quota : '104857600',
        rate : {
            rateId : '1011',
            countryCode : '7',
            countryName : 'Россия',
            operatorName : 'Megafon',
            price : '5888',
        },
        used : '58424000',
    },
    lpaUrl : 'lpaUrl-2',
    name : {
        value : 'Брат'
    },
    packs : [],
}]
