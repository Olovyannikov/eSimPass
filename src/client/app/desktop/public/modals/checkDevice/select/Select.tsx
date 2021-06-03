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

    const renderArrowImg = () : string => isOpen ? img_activeArrowDown : img_arrowDown;

    const renderText = () => hasChoose ? choosenType : props.text;

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
            dropDownEvent()
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
