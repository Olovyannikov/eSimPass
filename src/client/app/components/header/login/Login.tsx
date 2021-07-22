import s from './Login.module.scss';
import {Container} from "../../container/Container";
import {BackArr} from "../../icons";
import {Button} from "../../button/Button";
import {MouseEventHandler} from "react";
import {useInput} from "../registration/Registration";

interface LoginModel {
    isLogin?: VoidFunction | MouseEventHandler | boolean;
    toggle?: MouseEventHandler;
    back?: MouseEventHandler;
}

export const Login = (props: LoginModel) => {

    const [email, setEmail] = useInput('email', 'Электронная почта');
    const [password, setPassword] = useInput('password', 'Введите пароль');

    return (
        <section className={`${s.login} ${props.isLogin ? s.active : ''}`}>
                <div className={s.top}>
                    <button onClick={props.back} className={`btn-reset ${s.back}`}>
                        <BackArr/>
                    </button>
                    <h2 className={s.title}>Войти в личный кабинет</h2>
                    <button onClick={props.toggle} className={`${s.burger} ${s.active}`}/>
                </div>
                <div className={s.main}>
                    <Container>
                        <form className={s.form}>
                            <label className={s.formLabel}>
                                {setEmail}
                            </label>
                            <label className={s.formLabel}>
                                {setPassword}
                            </label>
                            <Button size={'large'} disabled={email == ''} color={'primary'}>Войти в аккаунт</Button>
                            <Button color={'link'}>Забыли пароль?</Button>
                        </form>
                    </Container>
                </div>
        </section>
    )
}
