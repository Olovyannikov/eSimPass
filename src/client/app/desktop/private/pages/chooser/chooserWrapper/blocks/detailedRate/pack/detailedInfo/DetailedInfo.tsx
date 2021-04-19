/*
import * as React from 'react';
import { ListRatesResponse } from '../../../../../../../../../../generated/proto.web';

import {img_wifiPack, img_ratePack, img_durationPack, img_ltePack} from '../../../../../../../../../../resources/images';
import { Button } from '../../../../../../../components/buttons/Button';
import { Line } from './line/Line';

interface DetailedInfoModel {
    static : boolean;
    pack? : ListRatesResponse.SuccessModel.RateModel.PackModel;
    action? : Function
}

export const DetailedInfo = (props : DetailedInfoModel) => {

    const doRender = () => {
        if (props.static) {
            return (
                <>
                    <Line img={img_wifiPack} text='Раздача интернета' plain='Есть' />
                    <Line img={img_ltePack} text='LTE (4G) связь' plain='Есть' />
                    <Button className='button' text="Бесплатно" />
                </>
            )
        } 
        else if (props.pack) {
            return (
                <>
                    <Line img={img_ratePack} text='Трафик' quota={props.pack.quota} />
                    <Line img={img_durationPack} text='Срок действия' duration={props.pack.duration} />
                    <Button func={() => props.action(props.pack)} className='button-buy' text={`${props.pack.price}₽ - Подключить пакет`} />
                </>
            )
        }
        else  {
            return (
                <>
                    <Line img={img_ratePack} text='Трафик' plain={'500 мб'} />
                    <Line img={img_durationPack} text='Срок действия' plain={'7 дн.'} />
                    <Button className='button' text='Подключен автоматически' />
                </>
            )
        }
    }
    
    return (
        <div className="DetailedInfo">
            {doRender()}
        </div>
    )
}
*/