import s from './FAQ.module.scss';
import {Container} from "../../../../components/container/Container";
import {Button} from "../../../../components/button/Button";
import {BigPhone, Simicon} from "../../../../components/icons";

export const FAQ = () => (
    <section className={s.faq}>
        <Container>
            <h2 className={s.title}>Что такое виртуальная eSIM от Глонасс Мобайл?</h2>
            <div className={s.content}>
                <div className={s.column}>
                    <div className={s.image}>
                        <Simicon/>
                    </div>
                    <h3 className={s.subtitle}>Инновация</h3>
                    <p className={s.descr}>Виртуальная eSIM это новая технология, которая не требует отдельного
                        SIM-слота в смартфоне, ваш смартфон может иметь только 1 слот для При этом виртуальная eSIM
                        функционирует как обычная SIM-карта. Перед оформлением eSIM обязательно проверьте поддерживает
                        ли Ваше устройство технологию виртуальной eSIM. </p>
                    <Button color={'secondary'}>Моё устройство подойдет?</Button>
                </div>
                <div className={s.column}>
                    <div className={s.image}>
                        <BigPhone/>
                    </div>
                    <h3 className={s.subtitle}>Удобство</h3>
                    <p className={s.descr}>В отличие от обычной SIM-карты, с eSIM не нужно переставлять SIM-карты или
                        использовать два смартфона - постоянный российский номер всегда будет активен и одновременно
                        будут доступны льготные тарифы на мобильный интернет местных мобильных операторов.
                        С виртуальной eSIM партнеры и родственники смогут дозвонится также и по стандартному российскому
                        номеру.</p>
                    <Button>Подключить</Button>
                </div>
            </div>
        </Container>
    </section>
)
