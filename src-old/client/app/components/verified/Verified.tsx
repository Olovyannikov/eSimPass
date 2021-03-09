import * as React from 'react';

import okay from '../../../../img/okay.png';

export const Verified = () => {
    
    return (
        <div className="Verified">
            <div>
                <div className="text">Верификация</div>
                <img className='okay' src={okay} alt="Okay"/>
            </div>
            <div className='document'>Документы подтвержденны</div>
        </div>
    )
}
