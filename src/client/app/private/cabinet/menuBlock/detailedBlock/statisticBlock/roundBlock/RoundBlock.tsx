import * as React from 'react';

import leftButton from '../../../../../../../img/left-arrow.png'
import rightButton from '../../../../../../../img/right-arrow.png'
import { Donut } from './donut/Donut';

interface IRoundBlock {
    percentage : number;
    money : string;
}

export const RoundBlock = ({percentage, money} : IRoundBlock) => {

    return (
        <div className="RoundBlock">
            <div className="round-block__left-button">
                <img className='round-block__button' src={leftButton} alt="Left Button"/>
            </div>
            <Donut date='За январь 2021г.' money={money} percentage={percentage} />
            <div className="round-block__right-button">
                <img className='round-block__button' src={rightButton} alt='Right Button'/>
            </div>
        </div>
    )
}
