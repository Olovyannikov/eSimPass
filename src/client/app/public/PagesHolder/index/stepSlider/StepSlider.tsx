import s from './StepSlider.module.scss';
import {Container} from "../../../../components/container/Container";
import iphone from '../../../../../resources/img/iPhoneScroll@2x.png';
import iphone2 from '../../../../../resources/img/iPhoneScroll2@2x.png';
import qr from '../../../../../resources/img/qrcode.png';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Controller, Navigation, Pagination} from 'swiper';
import {useState} from "react";
import {AppGallery, Appstore, BackArr, CircleBtn, GooglePlay} from "../../../../components/icons";
import Link from "next/link";
import {Button} from "../../../../components/button/Button";

SwiperCore.use([Navigation, Pagination, Controller]);

export const StepSlider = () => {
    const [step, setStep] = useState(0)
    const [length, setLength] = useState<number>(0);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);

    return (
        <section className={s.steps}>
            <Container className={s.container}>
                <h2 className={s.title}>Как подключить eSIM-pass?</h2>
                <div className={s.content}>
                    <div className={s.sliderWithImages}>
                        <Swiper
                            updateOnWindowResize={true}
                            onResize={swiper => swiper.update()}
                            onInit={swiper => {
                                setStep(1);
                                setLength(swiper.$wrapperEl[0].childElementCount);
                            }}
                            autoHeight={true}
                            onSwiper={setFirstSwiper} controller={{control: secondSwiper}}
                            slidesPerView={1}
                            centeredSlides={true}
                            breakpoints={{
                                1200: {
                                    direction: 'vertical',
                                },
                            }}
                        >
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
                                    <img src={iphone2} alt="Как скачать приложение?"/>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={`${s.sliderImage} ${s.sliderImageTall}`}>
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
                                    <img src={iphone} alt="Как скачать приложение?"/>
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
                            }}
                            onResize={swiper => swiper.update()}
                            onReachEnd={swiper => swiper.params.slidesOffsetBefore = -200}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                            navigation={{
                                nextEl: `.${s.next}`,
                                prevEl: `.${s.prev}`
                            }}
                            breakpoints={{
                                1200: {
                                    direction: 'vertical',
                                    slidesPerView: 'auto',
                                    slidesPerGroup: 1,
                                    autoHeight: false,
                                    spaceBetween: 50,
                                    slideToClickedSlide: true,
                                    resizeObserver: true,
                                    centeredSlides: true,
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
                                    <p className={s.sliderText}>Приложение eSIM pass позволяет быстро работать с
                                        подключением и управлением пакетами интернет-трафика. В приложении отражается
                                        текущий баланс, количество оставшегося интернет-трафика и срок действия
                                        подключенного роумингового пакета. Так же вы можете сделать это и в Личном
                                        кабинете.</p>
                                    <p className={s.subTitle}>*Рекомендуем установить приложение заранее до поездки т.к.
                                        для этого потребуется, чтобы ваше устройство было подключено к интернету. </p>
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
                                    <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в
                                        смартфоне
                                        отсканируй
                                        камерой уникальный QR-код, который придет на почту.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <span className={s.counter}>
                                    Шаг 3/{length}
                                </span>
                                <h3 className={s.slideTitle}>Выбери страну поездки, подключи и оплати необходимый пакет интернет-трафика. </h3>
                                <div className={s.sliderContent}>
                                    <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в
                                        смартфоне
                                        отсканируй
                                        камерой уникальный QR-код, который придет на почту.</p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                            <span className={s.counter}>
                                Шаг 5/{length}
                            </span>
                                <h3 className={s.slideTitle}>По прибытию, выбери нужную страну и подключи пакет интернет-трафика.
                                    </h3>

                                <div className={s.sliderContent}>
                                    <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в
                                        смартфоне
                                        отсканируй
                                        камерой уникальный QR-код, который придет на почту.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <span className={s.counter}>
                                    Шаг 6/{length}
                                </span>
                                <h3 className={s.slideTitle}>Убедись, что передача данных включена через eSIM.</h3>

                                <div className={s.sliderContent}>
                                    <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в
                                        смартфоне отсканируй камерой уникальный QR-код, который придет на почту.</p>
                                    <div className={s.buttons}>
                                        <Button>Подключить</Button>
                                        <Button color={'secondary'}>Моё устройство подойдет?</Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <span className={s.counter}>
                                    Шаг 6/{length}
                                </span>
                                <h3 className={s.slideTitle}>Убедись, что передача данных включена через eSIM.</h3>

                                <div className={s.sliderContent}>
                                    <p className={s.sliderText}>Для автоматической настройки виртуальной eSIM в
                                        смартфоне отсканируй камерой уникальный QR-код, который придет на почту.</p>
                                    <div className={s.buttons}>
                                        <Button>Подключить</Button>
                                        <Button color={'secondary'}>Моё устройство подойдет?</Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className={s.controls}>
                    <button className={`btn-reset ${s.prev}`}><CircleBtn/></button>
                    <button className={`btn-reset ${s.next}`}><CircleBtn/></button>
                </div>
            </Container>

        </section>
    )
}
