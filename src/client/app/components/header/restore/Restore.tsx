import s from './Restore.module.scss';
import {MouseEventHandler} from "react";
import {BackArr, QR} from "../../icons";
import {Container} from "../../container/Container";
import {useInput} from "../registration/Registration";
import {Button} from "../../button/Button";

interface RestoreModel {
    isActive?: boolean;
    toggle?: MouseEventHandler;
    back?: MouseEventHandler;
}

export const Restore = (props: RestoreModel) => {

    const [email, setEmail] = useInput('email', 'Электронная почта');

    return (
        <section className={`${s.restore} ${props.isActive ? s.active : ''}`}>
            <div className={s.top}>
                <button onClick={props.back} className={`btn-reset ${s.back}`}>
                    <BackArr/>
                </button>
                <h2 className={s.title}>Восстановление пароля</h2>
                <button onClick={props.toggle} className={`${s.burger} ${s.active}`}/>
            </div>
            <Container>
                <div className={s.main}>
                    <p className={s.descr}>
                        На данный email мы отправим письмо с паролем от аккаунта. В случае если вы не помните
                        электронную почту, то позвоните по номеру 8 (903) 234-43-34, мы постараемся помочь вам.
                    </p>
                    <form className={s.form}>
                        <label className={s.formLabel}>
                            {setEmail}
                        </label>
                        <Button size={'large'} disabled={email == ''} color={'primary'}>Получить пароль</Button>
                    </form>
                </div>
            </Container>
        </section>
    )
}
