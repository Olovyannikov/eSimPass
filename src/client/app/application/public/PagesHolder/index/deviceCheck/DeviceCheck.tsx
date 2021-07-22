import s from './DeviceCheck.module.scss';
import {Container} from "../../../../../components/container/Container";
import {Button} from "../../../../../components/button/Button";
// @ts-ignore
import background from '../../../../../../resources/img/MainImage@2x.jpg';

export const DeviceCheck = () => {
    return (
        <section className={s.device}>
            <Container className={s.container}>
                <h2 className={s.title}>
                    Подключи eSIM-pass и путешествуй по миру без роуминга!
                </h2>
                <div className={s.background}>
                    <img src={background} alt="Путешествуй по миру без роуминга. Изображение."/>
                </div>
                <p className={s.descr}>
                    Подключение виртуальной eSIM не займет много времени, главное чтобы устройство поддерживало технологию виртуальной eSIM.
                </p>
                <div className={s.controls}>
                    <Button color={'primary'}>Подключить</Button>
                    <Button color={'secondary'}>Мое устройство подойдёт?</Button>
                </div>
            </Container>
        </section>
    )
}
