import * as React from 'react';
import { countUnit, dateUntil, ICountUnit, percentOfPackage, setColorBar } from '../../../../../codebase/utils';
import { ListDevicesResponse } from '../../../../../generated/proto.web';
import { PackageInfoRate } from '../../../../components/packageInfoRate/PackageInfoRate';

interface CurrentPack {
    currentPack : ListDevicesResponse.SuccessModel.DeviceModel.PackModel
}

export const ActivePackage = ({ currentPack } : CurrentPack) => {

    const [unit, setUnit] = React.useState<ICountUnit>({})

    React.useEffect(() => {
        setUnit(countUnit(+currentPack.quota, +currentPack.used))
    },[])

    if (!currentPack.hasOwnProperty('boughtDate')) {
        return <div className='title'>Нет активных пакетов</div>
    } else {
        return (
            <div className="ActivePackage">
                <div className="title">Активные пакеты</div>
                <div className="package">
                    <PackageInfoRate rate={currentPack.rate}/>
                    <div className="until">Действует до <span className='date'>{dateUntil(currentPack.boughtDate, currentPack.duration).toLocaleDateString()}</span></div>
                    <div className="progressBar small-bar">
                        <div className='bar' style={{width:`${percentOfPackage(Number(currentPack.quota), Number(currentPack.used))}%`, backgroundColor: setColorBar(percentOfPackage(Number(currentPack.quota), Number(currentPack.used)))}}></div>
                    </div>
                    <div className="amount">
                        <div className='spent'>{unit.used}</div>
                        <div className='total'>/ {unit.quota} {unit.unit}</div>
                    </div>
                    <div className="price-amount">{currentPack.price}<span>€</span> </div>
                </div>
            </div>
        )
    }
}

