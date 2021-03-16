import * as React from 'react';

import { unitConventer, restPercentOfPackageQuota, setColorBar, ConventerUnitModel } from '../../../../utils';

interface ProgressBarModel {
    quota : string;
    used : string;
    className? : string;
}

export const ProgressBar = (props : ProgressBarModel) => {

    const [unit, setUnit] = React.useState<ConventerUnitModel>({})

    React.useEffect(() => {
        setUnit(unitConventer(+props.quota, +props.used))
    },[])

    return (
        <>
            <div className="ProgressBar">
                <div className='bar' style={{width:`${restPercentOfPackageQuota(+props.quota, +props.used)}%`, backgroundColor: setColorBar(restPercentOfPackageQuota(+props.quota, +props.used))}}></div>
            </div>
            <div className="AmountRate">
                <div className='spent'>{unit.used}</div>
                <div className='total'>{unit.quota}/ {unit.unit} </div>
            </div>
        </>
    )
}
