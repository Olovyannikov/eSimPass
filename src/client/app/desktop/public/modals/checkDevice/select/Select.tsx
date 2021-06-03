import * as React from 'react';

import { Option } from './option/Option';
import { img_arrowDown, img_activeArrowDown } from 'resources/images';

interface SelectProps {
    disabled? : boolean;
    text : string;
    options?: string[];
}

export const Select = (props : SelectProps) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [hasChoose, setHasChoose] = React.useState<boolean>(false);
    const [choosenType, setChoosenType] = React.useState<string>(null)

    const dropDownEvent = () => setIsOpen(prev => prev = !prev);

    const handleClickOption = (text : string) => {
        dropDownEvent()
        setHasChoose(prev => prev = true);
        setChoosenType(prev => prev = text)
    }

    const renderArrow = () : string => isOpen ? img_activeArrowDown : img_arrowDown;

    const renderText = () => hasChoose ? choosenType : props.text;

    return (
        <div className={`Select ${props.disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`}>
            <div onClick={props.disabled ? null : dropDownEvent} className="choose-type">
                <div className='device-type'>{renderText()}</div>
                <img className='arrow-down' src={renderArrow()} alt="Down" />
            </div>
            <div className='options'>
                {props.options && props.options.map((el, index) => (
                    <Option onClick={() => handleClickOption(el)} key={index} text={el} />
                ))}
            </div>
        </div>
    )
}
