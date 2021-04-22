import { DURATION_MEASURE, ListChargesResponse } from "../generated/proto.web";

export const mockCharges : ListChargesResponse.SuccessModel.ChargeModel[] = [{
    date : "1619091512038",
    total : '160.5',
    type : {
        boughtRoamingPack : {
            countryId : 'MW',
            countryName : 'Малави',
            deviceId : '10091',
            deviceName : {
                value : 'Test',
            },
            duration : {
                messure : DURATION_MEASURE.DAY,
                quantity : 1,
            },
            operatorName : 'MALAWI ZAIN MOBILE - CELTEL - ZAIN'
        }
    }
}, {
    date : "1619091512038",
    total : '193.54',
    type : {
        boughtRoamingPack : {
            countryId : 'FI',
            countryName : 'Финляндия',
            deviceId : '10098',
            deviceName : {
                value : 'MOEK',
            },
            duration : {
                messure : DURATION_MEASURE.WEEK,
                quantity : 1,
            },
            operatorName : 'FINLAND MOBILE - (DNA FINNET NETWORKS)'
        }
    }
}, {
    date: "1619002420680",
    total: '333.9',
    type: {
        boughtRoamingPack: {
            countryId: "SE",
            countryName: "Швеция",
            deviceId: "10091",
            deviceName: {
                value: "Test",
            },
            duration: {
                messure: DURATION_MEASURE.DAY,
                quantity: 1,
            },
            operatorName: "SWEDEN COMVIQ MOBILE - Tele2 (COMVIQ)",
        }
    },
}, {
    date: "1619002420680",
    total: '333.9',
    type: {
        dataUsedFromBalance: {
            countryId: "SE",
            countryName: "Швеция",
            deviceId: "10091",
            deviceName: {
                value: "Test",
            },
            bytes : '52496728800',
            operatorName: "SWEDEN COMVIQ MOBILE - Tele2 (COMVIQ)",
        }
    },
},{
    date: "1619002420680",
    total: '333.9',
    type : {
        addBalance : {}
    }
},]
