import * as React from 'react';
import { Question, QuestionModel } from './question/Question';

export const FAQ = () => {

    return (
        <div className="FAQ">
            <div className="title">Частые вопросы</div>
            <div className="questions-block">
                {questions.map((el : QuestionModel, index : number) => (
                    <Question title={el.title} text={el.text} key={index} />
                ))}
            </div>
        </div>
    )
}

const questions : QuestionModel[] = [{
    title : 'Как узнать условия моего тарифа',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fuga reprehenderit officiis debitis ullam inventore rem dignissimos possimus numquam ratione.'
},{
    title : 'Как сменить тариф',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fuga reprehenderit officiis debitis ullam inventore rem dignissimos possimus numquam ratione.'
},{
    title : 'Как добавлять номера',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fuga reprehenderit officiis debitis ullam inventore rem dignissimos possimus numquam ratione.'
},{
    title : 'Как подтвердить паспортные данные через госуслуги',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fuga reprehenderit officiis debitis ullam inventore rem dignissimos possimus numquam ratione.'
}]
