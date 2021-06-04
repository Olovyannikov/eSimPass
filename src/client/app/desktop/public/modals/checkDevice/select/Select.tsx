import * as React from 'react';

import { Option } from './option/Option';
import { img_arrowDown, img_activeArrowDown } from 'resources/images';

interface SelectProps {
    disabled? : boolean;
    text : string;
    defaultText : string;
    options?: string[];
    setValue? : React.Dispatch<React.SetStateAction<string>>

}

export const Select = (props : SelectProps) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const dropDownEvent = () => setIsOpen(prev => prev = !prev);

    const handleClickOption = (text : string) => {
        dropDownEvent();
        props.setValue(text);
    }

    const renderArrowImg = () : string => isOpen ? img_activeArrowDown : img_arrowDown;

    const renderText = () => props.text ? props.text : props.defaultText;

    const renderMainClass = () => {
        if (props.disabled) {
            return 'Select disabled'
        }
        else if (!props.disabled && isOpen) {
            return 'Select open'
        }
        else return 'Select'
    }

    const activeDropDownEvent = () => {
        if (!props.disabled) {
            dropDownEvent();
        }
    }

    return (
        <div className={renderMainClass()}>
            <div onClick={activeDropDownEvent} className="choose-type">
                <div className='device-type'>{renderText()}</div>
                <img className='arrow-down' src={renderArrowImg()} alt="Down" />
            </div>
            <div className='options'>
                {props.options && props.options.map((el, index) => (
                    <Option onClick={() => handleClickOption(el)} key={index} text={el} />
                ))}
            </div>
        </div>
    )
}
