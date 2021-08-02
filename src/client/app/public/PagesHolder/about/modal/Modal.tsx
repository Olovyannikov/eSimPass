import s from './Modal.module.scss';
import {Container} from "../../../../components/container/Container";
import {Button} from "../../../../components/button/Button";
import {MouseEventHandler} from "react";

interface ModalModel {
    isActive?: boolean,
    trigger?: MouseEventHandler
}

export const Modal = (props: ModalModel) => {
    return (
        <div className={`${s.aboutModal} ${props.isActive ? s.active : ''}`}>
                <div className={s.top}>
                    <div className={s.preheader}>
                        <h2>Сотрудничество с Глонасс Мобайл</h2>
                    </div>
                    <button onClick={props.trigger} className={`${s.burger} ${s.active}`}/>
                </div>
                <div className={s.main}>
                    <p>Заполните форму и мы свяжемся с Вами в ближайшее время!</p>
                    <form>
                        <label>
                            <input className={`input`} type="text" placeholder={'Как к вам обращаться?'}/>
                        </label>
                        <label>
                            <input className={`input`} type="text" placeholder={'Название вашей компании'}/>
                        </label>
                        <label>
                            <input className={`input`} type="email" placeholder={'Электронная почта'}/>
                        </label>
                        <label>
                            <input className={`input`} type="tel" placeholder={'Телефон'}/>
                        </label>
                        <textarea className={`textarea`}  placeholder={'Дополнение (необязательно)'}/>
                        <Button size={'large'} disabled={true}>Отправить</Button>
                    </form>
                </div>
        </div>
    )
}
