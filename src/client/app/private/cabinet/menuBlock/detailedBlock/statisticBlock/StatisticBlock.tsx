import * as React from 'react';

import { RoundBlock } from './roundBlock/RoundBlock';
import { StatisticLine } from './staticticLine/StatisticLine';

export type StatisticType = 'internet' | 'spentMoney' | 'topUpMoney';

interface DataMonth {
    traffic? : string;
    money? : string;
}

export const StatisticBlock = () => {

    const [dataMonth, setDataMonth] = React.useState<DataMonth>({})

    React.useEffect(() => {
        setDataMonth({
            traffic : '6',
            money : '27'
        })
    }, [])

    const countPercentOfRound = () => {
        const sum = Number(dataMonth.traffic) + Number(dataMonth.money);
        return Number(dataMonth.money) / sum * 100;
    }

    return (
        <div className="StatisticBlock">
            <div className="statistic-block__title">По всем устройствам</div>
            <RoundBlock percentage={countPercentOfRound()} money={dataMonth?.money} />
            <StatisticLine type='internet' values={dataMonth.traffic} />
            <StatisticLine type='spentMoney' values={dataMonth.money} />
        </div>
    )
}
