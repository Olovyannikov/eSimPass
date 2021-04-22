import { ListDevicesResponse, DURATION_MEASURE } from "../generated/proto.web";


export const devicesData : ListDevicesResponse.SuccessModel.DeviceModel[] = [{
    created : "1616503481367",
    deviceId : '1',
    name : {
        value : 'Я',
    },
    packs : [{
        countryId : 'DZ',
        countryName : 'Алжир',
        operatorName : "ALGERIA WATANIYA MOBILE - Wataniya Telecom Algerie",
        price : '448.5',
        duration : {
            messure : DURATION_MEASURE.WEEK,
            quantity : 2,
        },
        quota : "104857600",
        created : "1619000501802",
        current : false,
    },{
        countryId : 'PA',
        countryName : 'Панама',
        operatorName : "PANAMA DIGICEL MOBILE - Digicel",
        price : '351',
        duration : {
            messure : DURATION_MEASURE.MONTH,
            quantity : 1,
        },
        quota : "1619006136786",
        created : "1619001558260",
        current : false,
    },{
        countryId : 'ZA',
        countryName : 'Южнаая Африка',
        operatorName : 'SOUTH AFRICA MTN MOBILE - MTN',
        price : '205.5',
        duration : {
            messure : DURATION_MEASURE.MONTH,
            quantity : 1,
        },
        quota : "1204857600",
        created : "1618839789984",
        current : true,
        activated : {
            activated : '1619074847000',
            finished : '1619194847000',
            lastUsed : '1619084847000',
            usedBytes : '92428800',
        }
    }],
    lpaUrl : 'lPA10001',
    currentPack : {
        countryId : 'ZA',
        countryName : 'Южнаая Африка',
        operatorName : 'SOUTH AFRICA MTN MOBILE - MTN',
        price : '205.5',
        duration : {
            messure : DURATION_MEASURE.MONTH,
            quantity : 1,
        },
        quota : "12404857600",
        created : "1618839789984",
        current : true,
        activated : {
            activated : '1619074847000',
            finished : '1619194847000',
            lastUsed : '1619084847000',
            usedBytes : '93432428800',
        }
    }
}]
