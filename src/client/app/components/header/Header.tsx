import {EIcon, LoginIcon, Logo} from "../icons";
import s from './Header.module.scss';
import Link from "next/link";
import {Container} from "../container/Container";
import {useEffect, useRef, useState} from "react";
import {Modal} from "./modal/Modal";
import {Registration} from "./registration/Registration";
import {Login} from "./login/Login";
import {Restore} from "./restore/Restore";

export const Header = () => {

    const firstRender = useRef(null);

    const [isActive, setActive] = useState<any>('');
    const [isAppModalActive, setAppModalActive] = useState<boolean>(false);
    const [isLogin, setLogin] = useState<boolean>(false);
    const [isRestoreActive, setRestoreActive] = useState<boolean>(false);

    const toggleRestore = () => {
        setLogin(!isLogin);
        setRestoreActive(!isRestoreActive);
    }

    const toggleModal = () => {
        setAppModalActive(!isAppModalActive);
        document.body.classList.toggle('overlay');
    }

    const toggleLogin = () => {
        setLogin(!isLogin);
        setRegistrationActive(false);

        if (!isRegistrationActive) {
            document.body.classList.toggle('overlay');
        }
    }

    const backButton = () => {
        setRestoreActive(false);
        setLogin(false);
        setRegistrationActive(true);
    }

    const [isRegistrationActive, setRegistrationActive] = useState<boolean>(false);

    const toggleRegistration = () => {
        setRegistrationActive(!isRegistrationActive);
        document.body.classList.toggle('overlay');
    }


    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.screen.availWidth < 1200) {
                setActive('');
                document.body.classList.remove('menu-active');
                document.body.style.overflow = 'auto';
            }
        });

        document.body.addEventListener('click', (e: any) => {
            if (e.target.classList.contains('overlay')) {
                setRegistrationActive(false);
                setLogin(false);
                setAppModalActive(false);
                setRestoreActive(false);
                document.body.classList.remove('overlay');
            }
        })
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
                            <a onClick={() => {
                                setActive('');
                                document.body.classList.remove('menu-active')
                            }} className={s.logo}>
                                <Logo/>
                            </a>
                        </Link>
                    </div>
                    <div className={`${s.menu} ${isActive ? s.active : ''}`}>
                        <ul className={`list-reset ${s.links}`}>
                            <li><Link href="#"><a onClick={() => {setActive(''); document.body.classList.remove('menu-active')}} className={s.active}>Устройства и тарифы</a></Link></li>
                            <li><Link href="#"><a onClick={() => {setActive(''); document.body.classList.remove('menu-active')}}>Как подключить?</a></Link></li>
                            <li><Link href="#"><a onClick={() => {setActive(''); document.body.classList.remove('menu-active')}}>Особенности E-SIM</a></Link></li>
                            <li className={s.last}><Link href="/about"><a onClick={() => {setActive(''); document.body.classList.remove('menu-active')}}>О нас</a></Link></li>
                        </ul>
                        <div className={s.about}>
                            <button onClick={toggleModal} className={'btn-reset'}><EIcon/>eSIM App</button>
                            <a onClick={toggleRegistration}><>Личный кабинет<LoginIcon/></>
                            </a>
                        </div>
                    </div>
                    <div className={s.right}>
                        <button onClick={toggleBurger} className={`${s.burger} ${isActive ? s.active : ''}`}>
                            <span className={s.burger__line}/>
                        </button>
                    </div>
                </Container>
            </header>
            <Modal isActive={isAppModalActive} toggle={toggleModal}/>
            <Registration isLogin={toggleLogin} isActive={isRegistrationActive} toggle={toggleRegistration}/>
            <Login isRestore={toggleRestore} back={backButton} toggle={toggleLogin} isLogin={isLogin}/>
            <Restore isActive={isRestoreActive} toggle={toggleRestore} back={backButton}/>
        </>
    )
}
