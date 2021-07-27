import s from './Modal.module.scss';
import {MouseEventHandler, useState} from "react";
import {Container} from "../../../../../components/container/Container";
import {BackArr, Chevron} from "../../../../../components/icons";

interface ModalModel {
    isActive?: boolean;
    isDeviceModal?: boolean;
    toggleDeviceModal?: MouseEventHandler;
    toggleModal?: MouseEventHandler;
    setDevice?: MouseEventHandler;
    device?: string;
    maintainer?: string;
}

export const Modal = (props: ModalModel) => {

    return (
        <>
            <section className={`${s.deviceModal} ${props.isActive ? s.active : ''}`}>
                <Container>
                    <div className={s.top}>
                        <h2 className={s.title}>eSIM и мое устройство совместимы?</h2>
                        <button className={`${s.burger} ${s.active}`} onClick={props.toggleModal}/>
                    </div>
                    <div className={s.main}>
                        {props.device !== '' ?
                            <>
                                <button className={`btn-reset ${s.selectBtn}`} onClick={props.toggleDeviceModal}>
                                    <span className={s.smallTitle}>Выберите устройство</span>
                                    <span className={s.deviceName}>{props.device}</span>
                                    <Chevron/>
                                </button>
                                <button className={`btn-reset ${s.selectBtn}`} onClick={props.toggleDeviceModal}>
                                    <span className={s.btnTitle}>Выберите производителя</span>
                                    <Chevron/>
                                </button>
                            </> :
                            <>
                                <button className={`btn-reset ${s.selectBtn}`} onClick={props.toggleDeviceModal}>
                                    <span className={s.smallTitle}>Выберите устройство</span>
                                    <span className={s.deviceName}>{props.device}</span>

                                    <Chevron/>
                                </button>
                            </>
                        }
                    </div>
                </Container>
            </section>

            <section className={`${s.deviceChoose} ${props.isDeviceModal ? s.active : ''}`}>
                <Container>
                    <div className={s.top}>
                        <button className={`btn-reset ${s.back}`} onClick={props.toggleDeviceModal}>
                            <BackArr/>
                        </button>
                        <h2 className={s.title}>Выберите устройство</h2>
                    </div>
                    <div className={s.main}>
                        <ul className={`list-reset ${s.deviceList}`}>
                            <li>
                                <button onClick={props.setDevice} className="btn-reset">Смартфон</button>
                            </li>
                            <li>
                                <button onClick={props.setDevice} className="btn-reset">Часы</button>
                            </li>
                            <li>
                                <button onClick={props.setDevice} className="btn-reset">Планшет</button>
                            </li>
                        </ul>
                    </div>
                </Container>
            </section>
        </>
    )
}
