import * as React from 'react';

interface Props {
    text : string;
    className? : string;
    func? : () => void;
    disabled? : boolean;
}

export const Button = ({text, className, func, disabled} : Props) => {
    
    return (
        <button disabled={disabled} onClick={func} className={`Button ${className}`}>
            <div>{text}</div>
        </button>
    )
}
