import * as React from 'react';

interface Props {
    text : string;
    className? : string;
    func? : () => void;
}

export const Button = ({text, className, func} : Props) => {
    
    return (
        <div onClick={func} className={`Button ${className}`}>
            <div>{text}</div>
        </div>
    )
}