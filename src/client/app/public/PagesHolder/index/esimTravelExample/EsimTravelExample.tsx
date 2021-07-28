import s from './EsimTravelExample.module.scss';
import {Container} from "../../../../components/container/Container";
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import sliderImage1 from '../../../../../resources/img/slider-1@2x.jpg';
import sliderImage2 from '../../../../../resources/img/slider-2@2x.jpg';
import sliderImage4 from '../../../../../resources/img/slider-4@2x.jpg';
import {Button} from "../../../../components/button/Button";
import {BackArr} from "../../../../components/icons";

SwiperCore.use([Navigation, Pagination]);

export const EsimTravelExample = () => {
    return (
        <section className={s.travel}>
            <Container>
                <h2 className={s.title}>Сколько будет стоить E-Sim в путешествии?</h2>
                <div className={s.slider}>
                    <Swiper
                        spaceBetween={11}
                        slidesPerView={1.005}
                        navigation={{
                            nextEl: `.${s.next}`,
                            prevEl: `.${s.prev}`
                        }}
                        pagination={{clickable: true}}
                        updateOnWindowResize={true}
                        breakpoints={{
                            768: {
                                slidesPerView: 2
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 25
                            }
                        }}>
                        <SwiperSlide>
                            <img src={sliderImage1} alt=""/>
                            <div className={s.card}>
                                <h3>Франция</h3>
                                <div className={s.info}>
                                    <div className={s.left}>
                                        <span>100 мб</span>
                                        <p>217 ₽</p>
                                    </div>
                                    <div className={s.right}>
                                        <span>1 гб</span>
                                        <p>1967 ₽</p>
                                    </div>
                                </div>
                                <Button color={'dark'}>Подключить</Button>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={sliderImage2} alt=""/>
                            <div className={s.card}>
                                <h3>New-York</h3>
                                <div className={s.info}>
                                    <div className={s.left}>
                                        <span>100 мб</span>
                                        <p>2217 ₽</p>
                                    </div>
                                    <div className={s.right}>
                                        <span>1 гб</span>
                                        <p>19067 ₽</p>
                                    </div>
                                </div>
                                <Button color={'dark'}>Подключить</Button>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={sliderImage1} alt=""/>
                            <div className={s.card}>
                                <h3>Папуа–Новая Гвинея</h3>
                                <div className={s.info}>
                                    <div className={s.left}>
                                        <span>100 мб</span>
                                        <p>217 ₽</p>
                                    </div>
                                    <div className={s.right}>
                                        <span>1 гб</span>
                                        <p>1967 ₽</p>
                                    </div>
                                </div>
                                <Button color={'dark'}>Подключить</Button>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={sliderImage4} alt=""/>
                            <div className={s.card}>
                                <h3>Ростов-на-Дону</h3>
                                <div className={s.info}>
                                    <div className={s.left}>
                                        <span>1000 мб</span>
                                        <p>2172 ₽</p>
                                    </div>
                                    <div className={s.right}>
                                        <span>1 гб</span>
                                        <p>19670 ₽</p>
                                    </div>
                                </div>
                                <Button color={'dark'}>Подключить</Button>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={sliderImage1} alt=""/>
                            <div className={s.card}>
                                <h3>Франция</h3>
                                <div className={s.info}>
                                    <div className={s.left}>
                                        <span>100 мб</span>
                                        <p>217 ₽</p>
                                    </div>
                                    <div className={s.right}>
                                        <span>1 гб</span>
                                        <p>1967 ₽</p>
                                    </div>
                                </div>
                                <Button color={'dark'}>Подключить</Button>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <button className={`${s.next} btn-reset`}><BackArr stroke={'#fff'}/></button>
                    <button className={`${s.prev} btn-reset`}><BackArr stroke={'#fff'}/></button>
                </div>
            </Container>
        </section>
    )
}
