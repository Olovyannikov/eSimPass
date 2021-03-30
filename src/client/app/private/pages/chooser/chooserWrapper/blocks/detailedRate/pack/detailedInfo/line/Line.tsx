import * as React from 'react';

interface LineModel {
    img : string;
    text : string;
    amount : string;
}

export const Line = (props : LineModel) => {

    
    return (
        <div className="Line">
            <img src={props.img} alt='Img' className='img-icon'/>
            <span className='text'>{props.text}</span>
            <span className='amount'>{props.amount}</span>
        </div>
    )
}
