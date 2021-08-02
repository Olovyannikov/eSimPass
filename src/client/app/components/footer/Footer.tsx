import s from './Footer.module.scss';
import {Container} from "../container/Container";
import {Logo} from "../icons";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <h2 className="visually-hidden">Подвал сайта</h2>
            <Container>
                <div className={s.logo}>
                    <Link href={'#'}>
                        <a><Logo/></a>
                    </Link>
                </div>
            </Container>
            <Container className={s.container}>
                <div className={s.column}>
                    <div className={s.contacts}>
                        <h3>Контакты:</h3>
                        <span>ООО "Глонасс Мобайл"</span>
                        <span>ОГРН 1197746459460</span>
                        <span>ИНН 7719494560</span>
                        <address>
                            Юр. адрес: 107023, г.Москва, Семеновская площадь, 1а
                        </address>
                    </div>
                </div>
                <div className={s.column}>
                    <ul className={`list-reset ${s.menu}`}>
                        <li><Link href="#"><a>Политика конфединциальности</a></Link></li>
                        <li><Link href="#"><a>Условия оказания услуг связи</a></Link></li>
                        <li><Link href="#"><a>Устройства, поддерживающие eSIM</a></Link></li>
                        <li><Link href="#"><a>О нас</a></Link></li>
                    </ul>
                </div>
            </Container>
        </footer>
    )
}
