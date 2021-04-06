import * as React from 'react';

import { ListRatesResponse } from '../../../../../../../../../../../generated/proto.web';
import { img_planeBig } from './../../../../../../../../../../../resources/images';

import { Props } from '../CountryBlock';
import { PackItem } from './item/PackItem';
import { STATE_API } from '../../../../../../../../../../../redux/StateApi';

export const PricesBlock = ({ rate }: Props) => {

    //CHECK PACKITEM !

    return (
        <div className="PricesBlock">

            <div className="prices-block__prices">
                <div className="PackItem">
                    <span className='pack-item__size'>Помегабайтный тариф</span>
                    <span className='pack-item__price'>{rate.price} ₽</span>
                </div>
                {rate.packs.map((pack: ListRatesResponse.SuccessModel.RateModel.PackModel) => <PackItem pack={pack} key={pack.quota} />)}
            </div>
            <div className="prices-block__planeBlock">
                <img src={img_planeBig} />
                <div className="prices-block__connect">
                    <a>
                        <div onClick={() => STATE_API.showPublicWizard('register')}>
                            Подключить
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
