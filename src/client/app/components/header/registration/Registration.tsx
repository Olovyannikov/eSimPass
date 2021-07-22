import s from './Registration.module.scss';
import Link from "next/link";
import {Container} from "../../container/Container";
import {Button} from "../../button/Button";
import {MouseEventHandler, SetStateAction, useState} from "react";
import {QR} from "../../icons";

interface RegistrationModel {
    isActive?: boolean;
    toggle?: MouseEventHandler;
    isLogin?: MouseEventHandler;
}

export const useInput = (type: string, placeholder: string) => {
    const [value, setValue] = useState("");
    const input = <input className={'input'} value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} type={type} />;
    return [value, input];
}

 export const Registration = (props: RegistrationModel) => {

     const [email, setEmail] = useInput('email', 'Электронная почта');
     const [password, setPassword] = useInput('password', 'Придумайте пароль');
     const [passwordRepeat, setpasswordRepeat] = useInput('password', 'Повторите пароль');

    return (
        <section className={`${s.registration} ${props.isActive ? s.active : ''}`}>
            <div className={s.top}>
                <QR/>
                <h2 className={s.title}>
                    Регистрация и получение виртуальной eSIM
                    <span>Всего за 2 шага!</span>
                </h2>
                <Link href={'/'}>
                    <button onClick={props.toggle} className={`${s.burger} ${s.active}`} aria-label={'Вернуться на главную'}/>
                </Link>
            </div>
            <Container className={s.container}>
                <p className={s.descr}>
                    На данный email мы отправим письмо с QR-кодом для автоматической настройки виртуальной eSIM на Вашем
                    устройстве. Так же мы создадим создадим Личный кабинет, привязанный к указанному e-mail.
                </p>
                <form className={s.form}>
                    <label className={s.formLabel}>
                        {setEmail}
                    </label>
                    <label className={s.formLabel}>
                        {setPassword}
                    </label>
                    <label className={s.formLabel}>
                        {setpasswordRepeat}
                    </label>
                    <Button size={'large'} disabled={email == ''} color={'primary'}>Подключить</Button>
                    <Button onClick={props.isLogin} color={'link'}>Уже зарегистрированы?</Button>
                </form>
            </Container>
        </section>
    )
}
