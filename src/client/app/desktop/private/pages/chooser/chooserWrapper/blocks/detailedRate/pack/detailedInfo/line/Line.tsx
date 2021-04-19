import * as React from 'react';
import { unitConventer, countDaysDyration } from '../../../../../../../../../../../utils';
import { DurationModel } from '../../../../../../../../../../../generated/proto.web';

interface LineModel {
    img : string;
    text : string;
    quota? : string;
    duration? : DurationModel
    plain? : string;
}

export const Line = (props : LineModel) => {

    // TODO : CHECK empty props

    const doRender = () => {
        if (props.plain) {
            return <span className='amount'>{props.plain}</span>
        }
        else if (props.duration) {
            return <span className='amount'>{countDaysDyration(props.duration)} дн.</span>  
        }
        else if (props.quota) {
            const convertedQuota = unitConventer(+props.quota);
            
            return <span className='amount'>{convertedQuota.quota} {convertedQuota.unit}</span>  
        }
    }

    
    return (
        <div className="Line">
            <img src={props.img} alt='Img' className='img-icon'/>
            <span className='text'>{props.text}</span>
            {doRender()}
        </div>
    )
}

