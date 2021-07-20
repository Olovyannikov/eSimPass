import s from "./Modal.module.scss";
import {Container} from "../../container/Container";
import {MouseEventHandler} from "react";
import iphone from '../../../../resources/img/iPhoneScroll@2x.png';
import Link from "next/link";
import {AppGallery, Appstore, GooglePlay} from "../../icons";

interface ModalModel {
    isActive? : boolean,
    toggle? : MouseEventHandler
}

export const Modal = (props: ModalModel) => {

    return (
        <div className={`${s.appModal} ${props.isActive ? s.active : ''}`}>
            <Container>
                <div className={s.modalTop}>
                    <p className={s.modalTitle}>
                        Скачайте приложение ESIM, что бы получить доступ
                        ко всем функциям!
                    </p>
                    <button onClick={props.toggle} className={`${s.burger} ${s.active}`}/>
                </div>
                <div className={s.modalPhone}>
                    <img src={iphone}/>
                </div>
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
            </Container>
        </div>
    )
}
