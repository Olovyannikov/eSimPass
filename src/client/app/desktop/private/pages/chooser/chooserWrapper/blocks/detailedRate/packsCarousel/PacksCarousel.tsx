/*
import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../../../generated/proto.web';
import { Pack } from '../pack/Pack';
import { img_carouselArrowLeft, img_carouselArrowRight } from '../../../../../../../../../resources/images';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

interface PacksCarouselModel {
    rate : ListRatesResponse.SuccessModel.RateModel;
    action? : Function;
}

export const PacksCarousel = (props : PacksCarouselModel) => {

    const reducePacksToSlides = () => {
        const slideSize : number = 3;
        if (props.rate.packs) {
            return props.rate.packs.reduce((result : ListRatesResponse.SuccessModel.RateModel.PackModel[][], item, index) => {
    
                const chunkIndex = Math.floor(index / slideSize)
    
                if (!result[chunkIndex]) {
                    result[chunkIndex] = []
                }
    
                result[chunkIndex].push(item)
                
                return result
            }, [])
        }
    }

    //TODO simplify render logic

    return (

        <CarouselProvider
            totalSlides={reducePacksToSlides().length || 0}
            naturalSlideHeight={10}
            naturalSlideWidth={10}
            className='PacksCarousel'
            infinite={true}
        >
            <div className="relative-wrapper">
                <Slider
                    className='slider'
                >
                    {reducePacksToSlides().map((slide, index : number) => (
                        <Slide key={index} index={index}>
                            {
                                slide.map((pack, index) => (
                                    <Pack action={props.action} typeText='Пакетный тариф' pack={pack} key={index} rate={props.rate}  />
                                ))
                            }
                        </Slide>
                    ))} 
                </Slider>
                <ButtonBack className='button-left'>
                    <img className='arrow' src={img_carouselArrowLeft} alt="Arrow Left"/>
                </ButtonBack>
                <ButtonNext className='button-right'>
                    <img className='arrow' src={img_carouselArrowRight} alt="Arrow Right"/>
                </ButtonNext>
            </div>
        </CarouselProvider>
    )
}
*/