import * as React from 'react';

import { TableType } from '../PaymentsBlock';

interface ITogglerTable {
    toggle : () => void;
    table : TableType;
}

export const TogglerTable = ({toggle, table} : ITogglerTable) => {

    return (
        <div className="TogglerTable" onClick={toggle}>
            <div className={`togglerTable__expenses ${table === 'expenses' ? 'active' : ''} `}>Расходы</div>
            <div className={`togglerTable__payments ${table === 'payments' ? 'active' : ''} `}>Платежи</div>
        </div>
    )
}
