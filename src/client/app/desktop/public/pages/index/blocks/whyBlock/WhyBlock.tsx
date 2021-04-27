import * as React from 'react';
import { img_touch, img_travel, img_women, img_world } from '.././../../../../../../resources/images';

export const WhyBlock = () => {
    
    return (
        <div className="WhyBlock">
            <div className="left">
                <div className="title">
                    Почему eSIM Pass?
                </div>
                <div className="imgs">
                    <div className="left-part">
                        <img className='img_world' src={img_world} alt="World"/>
                        <div className="text">Связь по местным операторским тарифам</div>
                    </div>
                    <div className="center-part">
                        <img className='img_touch' src={img_touch} alt="Touch"/>
                        <div className="text">Легкое переключение между 200 операторов</div>
                    </div>
                    <div className="right-part">
                        <img className='img_travel' src={img_travel} alt="eSIM Pass"/>
                        <div className="text">Невозможно сломать/потерять, легко включить/отключить</div>
                    </div>
                </div>
            </div>
            <div className="right">
                <img className='img_women' src={img_women} />
            </div>
        </div>
    )
}
