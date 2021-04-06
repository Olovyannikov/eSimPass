import * as React from 'react';
import { img_touch, img_travel, img_women, img_world } from '.././../../../../../../resources/images';

export const WhyBlock = () => {
    
    return (
        <div className="WhyBlock">
            <div className="why-block__left">
                <div className="why-block__title">
                    Почему eSIM Travel?
                </div>
                <div className="why-block__imgs">
                    <div className="why-block__left-part">
                        <img className='why-block__img_world' src={img_world} alt="World"/>
                        <div className="why-block__text">Связь по местным операторским тарифам</div>
                    </div>
                    <div className="why-block__center-part">
                        <img className='why-block__img_touch' src={img_touch} alt="Touch"/>
                        <div className="why-block__text">Легкое переключение между 200 операторов</div>
                    </div>
                    <div className="why-block__right-part">
                        <img className='why-block__img_travel' src={img_travel} alt="eSIM Travel"/>
                        <div className="why-block__text">Невозможно сломать/потерять, легко включить/отключить</div>
                    </div>
                </div>
            </div>
            <div className="why-block__right">
                <img className='why-block__img_women' src={img_women} />
            </div>
        </div>
    )
}
