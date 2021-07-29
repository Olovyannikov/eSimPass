import s from './StepSlider.module.scss';
import {Container} from "../../../../components/container/Container";
import iphone from '../../../../../resources/img/iPhoneScroll@2x.png';
import iphone2 from '../../../../../resources/img/iPhoneScroll2@2x.png';
import qr from '../../../../../resources/img/qrcode.png';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Controller, Navigation, Pagination} from 'swiper';
import {useState} from "react";
import {AppGallery, Appstore, GooglePlay} from "../../../../components/icons";
import Link from "next/link";

SwiperCore.use([Navigation, Pagination, Controller]);

export const StepSlider = () => {
    const [step, setStep] = useState(0)
    const [length, setLength] = useState<number>(0);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);


    return (
        <section className={s.steps}>
            <Container>
                <h2 className={s.title}>Как подключить eSIM-pass?</h2>
                <div className={s.content}>
                    <div className={s.sliderWithImages}>
                        <Swiper
                            updateOnWindowResize={true}
                            onInit={swiper => {
                                setStep(1);
                                setLength(swiper.$wrapperEl[0].childElementCount);
                            }}
                            autoHeight={true}
                            pagination={{clickable: true}}
                            onSwiper={setFirstSwiper} controller={{control: secondSwiper}}
                            slidesPerView={1}
                            centeredSlides={true}
                            breakpoints={{
                                1200: {
                                    direction: 'vertical',
                                    autoHeight: false,
                                    touchRatio: 0.2
                                },
                            }}
                        >
                            < SwiperSlide>
                                < div className={s.sliderImage}>
                                    <img src={iphone} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
                                    <img src={iphone2} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
                                    <img src={iphone2} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
                                    <img src={iphone2} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
                                    <img src={iphone2} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
                                    <img src={iphone2} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
                                    <img src={iphone2} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className={s.textSlider}>
                        <Swiper
                            updateOnWindowResize={true}
                            controller={{control: firstSwiper}}
                            onSwiper={setSecondSwiper}
                            autoHeight={true}
                            onSlideChange={swiper => {
                                // setStep( swiper.$wrapperEl[0])
                                swiper.init();
                                swiper.updateSize()
                            }}
                            slidesPerView={1}
                            breakpoints={{
                                1200: {
                                    direction: 'vertical',
                                    slidesPerView: 'auto',
                                    autoHeight: false,
                                    centeredSlides: true,
                                    slideToClickedSlide: true,
                                    touchRatio: 0.2,
                                },
                            }}
                        >
                            <SwiperSlide>
                             <span className={s.counter}>
                                Шаг 1/{length}
                            </span>
                                <h3 className={s.slideTitle}>Скачай приложение eSIM pass
                                    и зарегистрируйся в нём.</h3>
                                <div className={s.sliderContent}>
                                    <p className={s.sliderText}>Приложение eSIM pass необходимо для подключения и
                                        управления
                                        пакетами интернет-трафика.
                                        Рекомендуем установить приложение заранее до поездки т.к. для этого потребуется,
                                        чтобы
                                        ваше
                                        устройство было подключено к интернету.</p>
                                    <div className={s.download}>
                                        <div className={s.qrcode}>
                                            <img src={qr} alt="Скачать приложение. QR-код"/>
                                        </div>
                                        <ul className={`list-reset ${s.appstores}`}>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>
                                                        <Appstore/>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>
                                                        <GooglePlay/>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'#'}>
                                                    <a>
                                                        <AppGallery/>
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <span className={s.counter}>
                                    Шаг 2/{length}
                                </span>

                                <h3 className={s.slideTitle}>Заполни в приложении персональные данные.</h3>
                                <div className={s.sliderContent}>
                                <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в смартфоне
                                    отсканируй
                                    камерой уникальный QR-код, который придет на почту.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <span className={s.counter}>
                                Шаг 2/{length}
                            </span>

                                <h3 className={s.slideTitle}>Заполни в приложении персональные данные.</h3>
                                <div className={s.sliderContent}>
                                <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в смартфоне
                                    отсканируй
                                    камерой уникальный QR-код, который придет на почту.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <span className={s.counter}>
                                Шаг 2/{length}
                            </span>
                                <h3 className={s.slideTitle}>Заполни в приложении персональные данные.</h3>

                                <div className={s.sliderContent}>
                                <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в смартфоне
                                    отсканируй
                                    камерой уникальный QR-код, который придет на почту.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <span className={s.counter}>
                                Шаг 2/{length}
                            </span>
                                <h3 className={s.slideTitle}>Заполни в приложении персональные данные.</h3>

                                <div className={s.sliderContent}>
                                <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в смартфоне
                                    отсканируй
                                    камерой уникальный QR-код, который придет на почту.</p>
                                </div>
                            </SwiperSlide>

                            <div className={s.controls}></div>
                        </Swiper>
                    </div>
                </div>
            </Container>
        </section>
    )
}
