import s from './ModalMobile.module.scss';
import {BackArr, Chevron} from "../../../../../../components/icons";
import {Container} from "../../../../../../components/container/Container";
import {useState} from "react";

export const ModalMobile = (props: any) => {

    const [isDeviceModal, setDeviceModal] = useState<boolean>(false);
    const toggleDevice = () => setDeviceModal(!isDeviceModal);

    return (
        <>
            <div className={s.mainMobile}>
                {props.device == '' ?
                    <>
                        <button className={`btn-reset ${s.selectBtn}`} onClick={toggleDevice}>
                            <span className={s.smallTitle}>Выберите устройство</span>
                            <span className={s.deviceName}>{props.device}</span>
                            <Chevron/>
                        </button>
                        <button className={`btn-reset ${s.selectBtn}`} onClick={toggleDevice}>
                            <span className={s.btnTitle}>Выберите производителя</span>
                            <Chevron/>
                        </button>
                    </> :
                    <>
                        <button className={`btn-reset ${s.selectBtn}`} onClick={toggleDevice}>
                            <span className={s.smallTitle}>Выберите устройство</span>
                            <span className={s.deviceName}>{props.device}</span>
                            <Chevron/>
                        </button>
                    </>
                }
            </div>

            <section className={`${s.deviceChoose} ${isDeviceModal ? s.active : ''}`}>
                <Container>
                    <div className={s.top}>
                        <button className={`btn-reset ${s.back}`} onClick={toggleDevice}>
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
