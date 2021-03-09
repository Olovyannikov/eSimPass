import * as React from 'react';

import supportImg from '../../../../../../img/support-img.png';
import { Button } from '../../../../../components/buttons/Button';

export const ChatBlock = () => {
    return (
        <div className="ChatBlock">
            <div className="chat-block__img">
                <img className='chat-block__img_icon' src={supportImg} alt="Support"/>
            </div>
            <div className="chat-block__info">
                <div className="chat-block__title">Онлайн чат с поддержкой</div>
                <div className="chat-block__text">Онлайн-чат — это простой и быстрый способ решения ваших вопросов. Наши специалисты всегда на связи и оперативно ответят Вам.</div>
            </div>
            <Button text='Открыть чат' className='chat-block__button'/>
        </div>
    )
}
