import s from './Modal.module.scss';
import {MouseEventHandler, useState} from "react";
import {Container} from "../../../../../components/container/Container";
import {BackArr, Chevron} from "../../../../../components/icons";
import {ModalDesktop} from "./modalDesktop/ModalDesktop";
import {ModalMobile} from "./modalMobile/ModalMobile";

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

    const [isChosen, setChoose] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState(-1);

    const handleItemClick = (id: any) => {
        if (selectedItem !== id) {
            setSelectedItem(id);
            setChoose(!isChosen);
        }
    }

    return (
        <>
            <section className={`${s.deviceModal} ${props.isActive ? s.active : ''}`}>
                <Container className={s.modalContainer}>
                    <div className={s.top}>
                        <h2 className={s.title}>eSIM и мое устройство совместимы?</h2>
                        <button className={`${s.burger} ${s.active}`} onClick={props.toggleModal}/>
                    </div>
                    <ModalMobile props={props}/>
                    <ModalDesktop/>
                </Container>
            </section>
        </>
    )
}
