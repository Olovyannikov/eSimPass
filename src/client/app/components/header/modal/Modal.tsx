import s from "./Modal.module.scss";
import {Container} from "../../container/Container";
import {MouseEventHandler} from "react";
import iphone from '../../../../resources/img/iPhoneScroll@2x.png';
import qrcode from '../../../../resources/img/qrcode.png';
import Link from "next/link";
import {AppGallery, Appstore, GooglePlay} from "../../icons";

interface ModalModel {
    isActive?: boolean,
    toggle?: MouseEventHandler
}

export const Modal = (props: ModalModel) => {

    return (
        <div className={`${s.appModal} ${props.isActive ? s.active : ''}`}>
            <Container className={s.container}>
                <div className={s.modalTop}>
                    <button onClick={props.toggle} className={`${s.burger} ${s.active}`}/>
                </div>
                <div className={s.modalPhone}>
                    <img src={iphone}/>
                </div>
                <div className={s.modalMessage}>
                    <p className={s.modalTitle}>
                        Скачайте приложение ESIM, чтобы получить доступ
                        ко всем функциям!
                    </p>
                    <div className={s.appDownload}>
                        <img className={s.qrcode} src={qrcode} alt="Кью Ар Код - Скачать приложение"/>
                        <ul className={`list-reset ${s.appstores}`}>
                            <li>
                                <Link href="#">
                                    <a>
                                        <Appstore/>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a>
                                        <GooglePlay/>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a>
                                        <AppGallery/>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}
