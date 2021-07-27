import s from "./Modal.module.scss";
import {Container} from "../../../../../components/container/Container";
import {BackArr, Preloader} from "../../../../../components/icons";
import {MouseEventHandler} from "react";

interface ModalModel {
    isActive?: boolean;
    toggleModal?: MouseEventHandler;
    countries?: any[];
    countryList?: JSX.Element
}

export const Modal = (props: ModalModel) => {
    return (
        <div className={`${s.countryModal} ${props.isActive ? s.active : ''}`}>
            <Container>
                <div className={s.top}>
                    <div className={s.preheader}>
                        <button onClick={props.toggleModal} className={`btn-reset`}><BackArr/></button>
                        <h2>Выберите страну</h2>
                    </div>
                    <label>
                        <input className={`input`} type="search" placeholder={'Найти страну'}/>
                    </label>
                </div>
                <div className={s.main}>
                    <h5 className={s.startLetter}>A</h5>
                    {props.countries.length === 0 ? <Preloader/> : props.countryList}
                </div>
            </Container>
        </div>
    )
}
