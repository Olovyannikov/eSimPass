import s from './Index.module.scss';
import {Button} from "../../../../components/button/Button";
import {Container} from "../components/container/Container";

export const Index = () => {
    return (
        <section className={s.index}>
            <Container>
                <h1 className={s.title}>Добро пожаловать в ваш личный кабинет!</h1>
                <p className={s.subtitle}>Пока что ваша eSIM не активирована. Мы поможем вам её активировать, просто
                    следуйте всем шагам настройки.</p>
                <div className={s.activate}>
                    <div className={s.top}>
                        <ul>
                            <li className={s.active}>1. Совместимость</li>
                            <li>2. Активируйте баланс</li>
                            <li>3. Паспортные данные</li>
                            <li>4. Активируйте QR</li>
                        </ul>
                    </div>
                    <div className={s.check}>
                        <h3>1.Проверьте, совместимо ли ваше устройство с eSIM?</h3>
                        <p>В случае если ваше устройство не подойдёт для подключения eSIM, вы можете заказать ничем не
                            уступающую по функциональности SIM-карту.</p>
                        <div className={s.buttons}>
                            <Button size={'badge'} color={'primary'}>Да, устройство подходит</Button>
                            <Button size={'badge'} color={'warning'}>Нет, устройство не подходит</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
