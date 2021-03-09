import * as React from 'react';

import arrowDown from '../../../../../../../img/arrow-down-faq.png';

export interface IQuestion {
    title : string;
    text? : string;
}

export const Question = ({title, text} : IQuestion) => {
    return (
        <div className="Question">
            <div className="question__title">{title}</div>
            <div className="question__text">{text}</div>
            <div className="question__img">
                <img className='question__icon' src={arrowDown} alt="Down"/>
            </div>
        </div>
    )
}
