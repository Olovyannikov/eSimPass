import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../../generated/proto.web';
import { Pack } from '../pack/Pack';
import { img_carouselArrowLeft, img_carouselArrowRight } from '../../../../../../../../resources/images';

interface PacksCarouselModel {
    rate : ListRatesResponse.SuccessModel.RateModel;
}

export const PacksCarousel = (props : PacksCarouselModel) => {

    return (
        <div className="PacksCarousel">
            <div className="button-left">
                <img className='arrow' src={img_carouselArrowLeft} alt="Arrow Left"/>
            </div>
            {/* {props.rate.packs.map((el, index : number) => (
                <Pack typeText='Пакетный тариф' pack={el} key={index} rate={props.rate}  />
            ))} */}
            <Pack static={true} typeText='Дополнительные услги' rate={props.rate} />
            <Pack static={true} typeText='Дополнительные услги' rate={props.rate} />
            <Pack static={true} typeText='Дополнительные услги' rate={props.rate} />
            <div className="button-right">
                <img className='arrow' src={img_carouselArrowRight} alt="Arrow Right"/>
            </div>
        </div>
    )
}
