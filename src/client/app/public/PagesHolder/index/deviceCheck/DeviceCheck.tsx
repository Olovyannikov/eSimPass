import s from './DeviceCheck.module.scss';
import {Container} from "../../../../components/container/Container";
import {Button} from "../../../../components/button/Button";
// @ts-ignore
import background from '../../../../../resources/img/MainImage@2x.jpg';
import {FastInternetIcon, Globe, PhoneIcon} from "../../../../components/icons";

export const DeviceCheck = () => {
    return (
        <section className={s.device}>
            <Container className={s.container}>
                <div className={s.content}>
                    <h2 className={s.title}>
                        Подключи eSIM-pass и путешествуй по миру без роуминга!
                    </h2>
                    <h2 className={s.titleDesktop}>
                        Путешествуйте <br/>
                        c eSIM без роуминга
                    </h2>
                    <div className={s.background}>
                        <img src={background} alt="Путешествуй по миру без роуминга. Изображение."/>
                    </div>
                    <p className={s.descr}>
                        Подключение виртуальной eSIM не займет много времени, главное чтобы устройство поддерживало
                        технологию виртуальной eSIM.
                    </p>
                    <p className={s.descrDesktop}>
                        Подключи ESIM-pass и путешествуй по миру без роуминга! <br/>
                        Подключение виртуальной eSIM не займет много времени, главное чтобы устройство поддерживало
                        технологию виртуальной eSIM.
                    </p>
                    <div className={s.controls}>
                        <Button color={'primary'}>Подключить</Button>
                        <Button color={'secondary'}>Моё устройство подойдёт?</Button>
                    </div>
                </div>
                <ul className={`list-reset ${s.features}`}>
                    <li>
                        <PhoneIcon/>
                        <span>Не нужно никуда ехать,<br/> быстро оформим удаленно!</span>
                    </li>
                    <li>
                        <Globe/>
                        <span>Работает в 200 странах<br/> без роуминга</span>
                    </li>
                    <li>
                        <FastInternetIcon/>
                        <span>4G связь<br/> без абонентской платы</span>
                    </li>
                </ul>
            </Container>
        </section>
    )
}
