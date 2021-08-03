import s from './Header.module.scss';
import {Container} from "../container/Container";
import {Logo, LogoutIcon} from "../../../../../components/icons";
import Link from "next/link";

export const Header = () => {
    return (
        <header className={s.header}>
            <Container className={s.container}>
                <Link href={'/'}>
                    <a><Logo/></a>
                </Link>
                <nav className={s.nav}>
                    <ul className={`list-reset`}>
                        <li><Link href="#"><a className={s.active}>Моя eSIM</a></Link></li>
                        <li><Link href="#"><a>Каталог</a></Link></li>
                        <li><Link href="#"><a>Расходы</a></Link></li>
                        <li><Link href="#"><a>Аккаунт</a></Link></li>
                        <li><Link href="#"><a>Заказать</a></Link></li>
                    </ul>
                </nav>
                <button className={`btn-reset ${s.loginBtn}`}>
                    <span>winetoadd@</span>
                    <LogoutIcon/>
                </button>
            </Container>
        </header>
    )
}
