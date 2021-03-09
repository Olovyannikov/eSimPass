import * as React from 'react';
import { ListDevicesResponse } from '../../../generated/proto.web';

interface IProps {
    rate : ListDevicesResponse.SuccessModel.DeviceModel.PackModel.RateModel
}

export const PackageInfoRate = ({rate} : IProps) => {
    return (
        <div className="PackageInfoRate">
            <div className='country'>{rate.countryName}</div>
            <div className="rate-info">{rate.operatorName}</div>
        </div>
    )
}
