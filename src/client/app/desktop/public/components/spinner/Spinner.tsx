import * as React from 'react';

interface SpinnerModel {
    className? : string;
}

export const Spinner = (props : SpinnerModel) => {
    
    return (
        <div className={`Spinner ${props.className}`}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
