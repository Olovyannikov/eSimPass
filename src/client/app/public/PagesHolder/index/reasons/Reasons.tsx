import s from './Reasons.module.scss';
import {Container} from "../../../../components/container/Container";
import {Airplane, BackArr, Bag, Clock, Dualsim, Globe, RU, Shield, Wallet} from "../../../../components/icons";
import {Button} from "../../../../components/button/Button";
import {scrollToTop} from "../../../../components/scrollToTop/ScrollToTop";

export const Reasons = () => (
    <section className={s.reasons}>
        <Container>
            <h2 className={s.title}>
                8 причин оформить виртуальную eSIM
            </h2>
            <ul className={`list-reset ${s.list}`}>
                <li>
                    <div className={s.icon}>
                        <Wallet/>
                    </div>
                    <p>eSIM не требует отдельного SIM-слота и используется в смартфоне как 2я SIM </p>
                </li>
                <li>
                    <div className={s.icon}>
                        <Dualsim/>
                    </div>
                    <p>Нет абоненткой платы – оплата только при использовании в роуминге </p>
                </li>
                <li>
                    <div className={s.icon}>
                        <RU/>
                    </div>
                    <p>Работает в любой стране на сетях по 200+ мобильных операторов </p>
                </li>
                <li>
                    <div className={s.icon}>
                        <Airplane/>
                    </div>
                    <p>eSIM всегда в телефоне, ее не получится потерять или забыть при экстренных сборахв</p>
                </li>
                <li>
                    <div className={s.icon}>
                        <Globe/>
                    </div>
                    <p>Льготные тарифы на мобильный интернет по ценам локальных операторов </p>
                </li>
                <li>
                    <div className={s.icon}>
                        <Clock/>
                    </div>
                    <p>Льготные тарифы на мобильный интернет по ценам локальных операторов </p>
                </li>
                <li>
                    <div className={s.icon}>
                        <Bag/>
                    </div>
                    <p>Льготные тарифы на мобильный интернет по ценам локальных операторов </p>
                </li>
                <li>
                    <div className={s.icon}>
                        <Shield/>
                    </div>
                    <p>eSIM всегда в телефоне, ее не получится потерять или забыть при экстренных сборах </p>
                </li>
                <li className={s.start}>
                    <h4>Начать пользоваться eSIM</h4>
                    <div className={s.controls}>
                        <Button size={'small'} color={'dark'}>Подключить</Button>
                        <Button size={'small'} isLink={true} color={'secondary'} href={'#'}>Приложение</Button>
                    </div>
                    <small>Для того, чтобы виртуальная eSIM была активна, необходимо
                        хотя бы 1 раз в 2 года совершать платную транзакцию от ХХ руб. </small>
                </li>
            </ul>
            <Button color={'secondary'} onClick={scrollToTop}>
                <><BackArr/> В начало</>
            </Button>
        </Container>
    </section>
)
