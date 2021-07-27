import s from './Modal.module.scss';
import {MouseEventHandler} from "react";
import {Container} from "../../../../../components/container/Container";
import {BackArr} from "../../../../../components/icons";

interface ModalModel {
    isActive?: boolean;
    toggleModal: MouseEventHandler;
}

export const Modal = (props: ModalModel) => {
    return (
        <>
            <section className={`${s.deviceModal} ${props.isActive ? s.active : ''}`}>
                <Container>
                    <div className={s.top}>
                        <h2 className={s.title}>eSIM и мое устройство совместимы?</h2>
                        <button className={s.burger} onClick={props.toggleModal}/>
                    </div>
                    <div className={s.main}>
                        <button className={`btn-reset ${s.selectBtn}`}>
                            Выберите устройство
                        </button>
                    </div>
                </Container>
            </section>

            <section className={`${s.deviceChoose}`}>
                <Container>
                    <div className={s.top}>
                        <button className={`btn-reset`} onClick={props.toggleModal}>
                            <BackArr/>
                        </button>
                        <h2 className={s.title}>Выберите устройство</h2>
                    </div>
                    <div className={s.main}>
                        <ul className={`list-reset`}>
                            <li><button className="btn-reset">Смартфон</button></li>
                            <li><button className="btn-reset">Часы</button></li>
                            <li><button className="btn-reset">Планшет</button></li>
                        </ul>
                    </div>
                </Container>
            </section>
        </>
    )
}
