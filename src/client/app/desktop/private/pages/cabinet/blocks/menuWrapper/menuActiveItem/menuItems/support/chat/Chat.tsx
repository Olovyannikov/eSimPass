import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import { CONNECTION } from '../../../../../../../../../../../Connection';
import { img_supportImg } from '../../../../../../../../../../../resources/images';
import { waitForClose } from '../../../../../../../../../../../utils';


export const Chat = () => {

    // TODO ask about support email 

    // const [supportEmail, setSupportEmail] = React.useState<string>(null);

    // const logger = new Logger('Logger in chat block');

    // const closedSubject = waitForClose();

    // React.useEffect(() => {

    //     CONNECTION.getSupportEmail({})
    //         .do(response => {
    //             if (response.email) {
    //                 setSupportEmail(prev => prev = response.email)
    //             }
    //         })
    //         .takeUntil(closedSubject)
    //         .subscribe(logger.rx.subscribe('Error get support email response'))

    // }, [])


    // const waitForEmail = () => {
    //     if (supportEmail) {
    //         return <a href={`mailto:${supportEmail}`} className='link-to-mail'>{supportEmail}</a>
    //     }
    //     else {
    //         return <span className='blur-text'>support@esimpass.com</span>
    //     }
    // }


    return (
        <div className="Chat">
             <div className="img">
                <img className='img_icon' src={img_supportImg} alt="Support"/>
            </div>
            <div className="info">
                <div className="title">Чат с поддержкой</div>
                <div className="text">Чат — это простой и быстрый способ решения ваших вопросов. Напишите на почту <a href="mailto:support@esimpass.com" className='link-to-mail'>support@esimpass.com</a> специалисты всегда на связи и оперативно ответят Вам.</div>
            </div>
        </div>
    )
}
