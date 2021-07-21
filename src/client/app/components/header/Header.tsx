import {EIcon, Login, Logo} from "../icons";
import s from './Header.module.scss';
import Link from "next/link";
import {Container} from "../container/Container";
import {useEffect, useRef, useState} from "react";
import {Modal} from "./modal/Modal";
import {Registration} from "./registration/Registration";

export const Header = () => {

    const firstRender = useRef(null);

    const [isActive, setActive] = useState<string>('');
    const [isAppModalActive, setAppModalActive] = useState<boolean>(false);

    const toggleModal = () => {
        setAppModalActive(!isAppModalActive);
    }

    const [isRegistrationActive, setRegistrationActive] = useState<boolean>(false);

    const toggleRegistration = () => {
        setRegistrationActive(!isRegistrationActive);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.screen.availWidth < 1200) {
                setActive('');
            }
        });
    });

    const toggleBurger = () => {
        if (isActive === 'burger--active') {
            setActive('');
            document.body.style.overflow = 'auto';
            document.body.classList.remove('menu-active');
        } else {
            setActive('burger--active');
            document.body.style.overflowY = 'hidden';
            document.body.classList.add('menu-active');
        }
    }

    return (
        <>
            <header ref={firstRender} className={s.header}>
                <Container className={s.container}>
                    <div className={s.left}>
                        <Link href={'/'}>
                            <a className={s.logo}>
                                <Logo/>
                            </a>
                        </Link>
                    </div>
                    <div className={`${s.menu} ${isActive ? s.active : ''}`}>
                        <ul className={`list-reset ${s.links}`}>
                            <li><Link href="#"><a className={s.active}>Устройства и тарифы</a></Link></li>
                            <li><Link href="#"><a>Как подключить?</a></Link></li>
                            <li><Link href="#"><a>Особенности E-SIM</a></Link></li>
                            <li className={s.last}><Link href="#"><a>О нас</a></Link></li>
                        </ul>
                        <div className={s.about}>
                            <button onClick={toggleModal} className={'btn-reset'}><EIcon/>eSIM App</button>
                            <a onClick={toggleRegistration}><>Личный кабинет<Login/></>
                            </a>
                        </div>
                    </div>
                    <div className={s.right}>
                        <button onClick={toggleBurger} className={`${s.burger} ${isActive ? s.active : ''}`}><span
                            className={s.burger__line}></span></button>
                    </div>
                </Container>
            </header>
            <Modal isActive={isAppModalActive} toggle={toggleModal}/>
            <Registration isActive={isRegistrationActive} toggle={toggleRegistration}/></>
    )
}
