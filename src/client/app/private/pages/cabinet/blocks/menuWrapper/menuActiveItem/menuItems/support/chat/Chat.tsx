import * as React from 'react';
import { img_supportImg } from '../../../../../../../../../../resources/images';
import { Button } from '../../../../../../../../components/buttons/Button';


export const Chat = () => {

    return (
        <div className="Chat">
             <div className="img">
                <img className='img_icon' src={img_supportImg} alt="Support"/>
            </div>
            <div className="info">
                <div className="title">Онлайн чат с поддержкой</div>
                <div className="text">Чат — это простой и быстрый способ решения ваших вопросов. Напишите на почту <a href="mailto:support@esimpass.com" className='link-to-mail'>support@esimpass.com</a> специалисты всегда на связи и оперативно ответят Вам.</div>
            </div>
            {/* <Button text='Открыть чат' className='chat-button'/> */}
        </div>
    )
}
