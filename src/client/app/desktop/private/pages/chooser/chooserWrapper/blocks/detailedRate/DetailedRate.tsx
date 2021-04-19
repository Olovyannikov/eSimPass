import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { FlagCountry } from './flagCountry/FlagCountry';
import { Pack } from './pack/Pack';
import { PacksCarousel } from './packsCarousel/PacksCarousel';

interface DetailedRateModel {
    rate: ListRatesResponse.SuccessModel.RateModel;
    setChoosenPack? : Function;
}

export const DetailedRate = (props : DetailedRateModel) => {
    
    return (
        <div className="DetailedRate">
            <FlagCountry rate={props.rate} />
            <Pack static={true} typeText='Дополнительные услги' rate={props.rate} />
            <Pack typeText='Помегабайтный тариф' rate={props.rate} />
            <PacksCarousel action={props.setChoosenPack} rate={props.rate} />
        </div>
    )
}
