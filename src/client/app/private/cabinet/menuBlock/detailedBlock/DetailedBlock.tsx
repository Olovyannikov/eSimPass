import * as React from 'react';

import { PaymentsBlock } from './paymentsBlock/PaymentsBlock';
import { StatisticBlock } from './statisticBlock/StatisticBlock';
import { mockCharges } from '../../../../mockCharges';

export const DetailedBlock = () => {
    return (
        <div className="DetailedBlock">
            <StatisticBlock />
            <PaymentsBlock listCharges={mockCharges} />
        </div>
    )
}
