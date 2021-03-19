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
    title : 'Если я активировал пакет интернета и выехал из страны, он "сгорает"?',
    text : 'Нет, пакет интернета будет работать при выезде и возвращении в страну в течении срока действия.'
},{
    title : 'Что делать, если купленный пакет интернета закончился, а Wi-Fi недоступен?',
    text : 'В новой стране на покупку и активацию нового пакета вам предоставляется небольшой объем бесплатного трафика, который будет вычтен из нового купленного пакета.'
},{
    title : 'Будут ли работать устройства в "Режиме модема".',
    text : 'Некоторые операторы сотовой связи накладывают ограничение на количество подключений или блокируют такую возможность.'
}]
