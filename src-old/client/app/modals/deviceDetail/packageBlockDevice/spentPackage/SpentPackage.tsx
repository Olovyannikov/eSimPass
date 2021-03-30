import * as React from 'react';
import { dateUntil } from '../../../../../codebase/utils';
import { ListDevicesResponse } from '../../../../../generated/proto.web';
import { PackageInfoRate } from '../../../../components/packageInfoRate/PackageInfoRate';

interface IProps {
    pack : ListDevicesResponse.SuccessModel.DeviceModel.PackModel
}

export const SpentPackage = ({pack} : IProps) => {

    const renderQuota = (quota : number) => {
        if (quota > 1048576000) {
            return Number((quota / 1024 / 1024 / 1000).toFixed(0)) + 'ГБ'
        } else {
            return Number((quota / 1024 / 1024 ).toFixed(0)) + 'МБ'
        }
    }

    return (
        <div className="SpentPackage">
            <div className="package">
                <PackageInfoRate rate={pack.rate}/>
                <div className="until">Действует до <span className='date'>{dateUntil(pack.boughtDate, pack.duration).toLocaleDateString()}</span></div>
                <div className="quota">
                    {renderQuota(Number(pack.quota))}
                </div>
                <div className="price-amount">{pack.price}<span>₽</span> </div>
            </div>
        </div>
    )
}
