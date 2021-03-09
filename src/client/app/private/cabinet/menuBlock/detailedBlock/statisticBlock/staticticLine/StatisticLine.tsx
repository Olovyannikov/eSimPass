import * as React from 'react';

import { StatisticType } from '../StatisticBlock';

interface IStatisticLine {
    type? : StatisticType;
    values? : string;
}

export const StatisticLine = ({type, values} : IStatisticLine) => {
    return (
        <div className="StatisticLine">
            <span className={`statistic-line__dot ${type === 'spentMoney' ? 'blue' : 'yellow'}`}></span>
            <span className="statistic-line__text">{type}</span>
            <span className="statistic-line__value">{values}</span>
        </div>
    )
}
