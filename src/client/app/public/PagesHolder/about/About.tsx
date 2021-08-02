import s from './About.module.scss';
import {Container} from "../../../components/container/Container";
import {Swiper, SwiperSlide} from "swiper/react";
import {Button} from "../../../components/button/Button";
import slide from '../../../../resources/img/aboutslide-1.jpg';
import {BackArr} from "../../../components/icons";
import {useEffect, useState} from "react";
import {Modal} from "./modal/Modal";
import {scrollToTop} from "../../../components/scrollToTop/ScrollToTop";

export const About = () => {

    const [isModalActive, setModalActive] = useState(false);
    const handleModalToggle = () => {
        setModalActive(!isModalActive);
        scrollToTop();
        document.body.classList.toggle('overlay');
    }

    useEffect(() => {
        document.body.addEventListener('click', (e: any) => {
            if (e.target.tagName === 'BODY') {
                setModalActive(false);
                document.body.classList.remove('overlay');
            }
        })
    })

    return (
        <main className="main">
            <section className={s.about}>
                <Container className={s.container}>
                    <h2 className={s.title}>О Глонасс Мобайл</h2>
                    <div className={s.content}>
                        <div className={s.col}>
                            <h3>Сфера деятельности Глонасс Мобайл</h3>
                            <p>Телекоммуникации и информационные технологии. Мы разрабатываем программное обеспечение
                                для
                                оказания услуг свзи по технологиям eSIM, создаем платформенные решения для оказания
                                дополнительных услуг связи, а также делаем проекты под ключ для MNO, MVNO и IoT
                                провайдеров.</p>
                        </div>
                        <div className={s.col}>
                            <h3>Наша миссия и стратегия</h3>
                            <p>Предоставлять услуги связи по оптимальной стоимости и использование только инновационных
                                технологий и бизнес-моделей!</p>
                        </div>
                        <Button onClick={handleModalToggle}>Хочу сотрудничать</Button>
                    </div>
                    <div className={s.slider}>
                        <Swiper
                            navigation={{
                                prevEl: `.${s.prev}`,
                                nextEl: `.${s.next}`,
                            }}
                            updateOnWindowResize={true}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                        >
                            <SwiperSlide>
                                <img src={slide} alt="About" aria-hidden={true}/>
                            </SwiperSlide>
                            <SwiperSlide>
                            </SwiperSlide>
                            <SwiperSlide>
                            </SwiperSlide>
                        </Swiper>
                        <button className={`btn-reset ${s.prev}`}><BackArr stroke={'#fff'}/></button>
                        <button className={`btn-reset ${s.next}`}><BackArr stroke={'#fff'}/></button>
                    </div>
                </Container>
                <Modal isActive={isModalActive} trigger={handleModalToggle}/>
            </section>
        </main>
    )
}
