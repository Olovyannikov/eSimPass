import s from './Registration.module.scss';
import {useRouter} from "next/router";
import Link from "next/link";
import {Container} from "../../container/Container";
import {Button} from "../../button/Button";
import {MouseEventHandler} from "react";

interface RegistrationModel {
    isActive?: boolean;
    toggle?: MouseEventHandler;
}

 export const Registration = (props: RegistrationModel) => {

    return (
        <section className={`${s.registration} ${props.isActive ? s.active : ''}`}>
            <div className={s.top}>
                <h2 className={s.title}>
                    Регистрация и получение виртуальной eSIM
                </h2>
                <Link href={'/'}>
                    <button onClick={props.toggle} className={`${s.burger} ${s.active}`} aria-label={'Вернуться на главную'}></button>
                </Link>
            </div>
            <Container>
                <p className={s.descr}>
                    На данный email мы отправим письмо с QR-кодом для автоматической настройки виртуальной eSIM на Вашем
                    устройстве. Так же мы создадим создадим Личный кабинет, привязанный к указанному e-mail.
                </p>
                <form className={s.form}>
                    <label className={s.formLabel}>
                        <input type="email" placeholder={'Электронная почта'}/>
                    </label>
                    <label className={s.formLabel}>
                        <input type="password" placeholder={'Придумайте пароль'}/>
                    </label>
                    <label className={s.formLabel}>
                        <input type="password" placeholder={'Повторите пароль'}/>
                    </label>
                    <Button color={'primary'}>Подключить</Button>
                </form>
            </Container>
        </section>
    )
}
