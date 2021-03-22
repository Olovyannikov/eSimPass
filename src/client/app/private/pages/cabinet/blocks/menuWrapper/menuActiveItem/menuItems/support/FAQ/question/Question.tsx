import * as React from 'react';
import { img_arrowDownFaq, img_arrowUpFaq } from '../../../../../../../../../../../resources/images';

export interface QuestionModel {
    title : string;
    text? : string;
}


export const Question = (props : QuestionModel) => {

    const [dropDown, setDropDown] = React.useState<boolean>(false);

    const toggleDropDown = () => setDropDown(prev => !prev);
    
    const setStyleForDropDown = () => dropDown ? 'show' : 'hidden';

    return (
        <div className={`Question ${setStyleForDropDown()}`}>
            <div className="title">{props.title}</div>
            <div className={`img ${setStyleForDropDown()}`} onClick={toggleDropDown}>
                <img className='icon' src={img_arrowDownFaq} alt="Arrow"/>
            </div>
            <div className={`text ${setStyleForDropDown()}`}>{props.text}</div>
        </div>
    )
}
