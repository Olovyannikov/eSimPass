import * as React from 'react';

import { IQuestion, Question } from './question/Question';

const questions : IQuestion[] = [{
    title : 'Как узнать условия моего тарифа',
},{
    title : 'Как сменить тариф',
},{
    title : 'Как добавлять номера',
},{
    title : 'Как подтвердить паспортные данные через госуслуги'
}]

export const FAQ = () => {
    return (
        <div className="FAQ">
            <div className="faq__title">Частые вопросы</div>
            <div className="faq__questions-block">
                {questions.map((el : IQuestion, index : number) => (
                    <Question title={el.title} text={el.text} key={index} />
                ))}
            </div>
        </div>
    )
}
