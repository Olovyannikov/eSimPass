import * as React from 'react';
import { countUnit, ICountUnit } from '../../../codebase/utils';

interface IAmountRate {
    quota : string;
    used : string;
}

export const AmountRate = ({quota, used} : IAmountRate) => {

    const [unit, setUnit] = React.useState<ICountUnit>({})

    React.useEffect(() => {
        setUnit(countUnit(+quota, +used))
    },[])
    
    return (
        <div className="AmountRate">
            <div className='amount-rate__spent'>{unit.used}</div>
            <div className='amount-rate__total'>/ {unit.quota} {unit.unit}</div>
        </div>
    )
}
