import * as React from 'react';

export interface IRateInfo {
    operatorName? : string;
}

export const RateInfo = ({operatorName} : IRateInfo) => {
    return (
        <div className="rate-info">
            <div className="rate-info__rate">
                <div>
                    eSIM {operatorName}
                </div>
            </div>
            <div className="rate-info__device-info">
                iPhone 11 Pro
            </div>
        </div>
    )
}
