import s from './CountryChoose.module.scss';
import {Container} from "../../../../components/container/Container";
import {Chevron, Preloader, Ticket} from "../../../../components/icons";
import {Button} from "../../../../components/button/Button";
import {useEffect, useState} from "react";
import {Modal} from "./modal/Modal";

interface CountryChooseModel {
    title?: string
}

export const CountryChoose = (props: CountryChooseModel) => {

    /* Modal start */

    const [isActive, setActive] = useState<boolean>(false);
    const toggleModal = () => {
        setActive(!isActive);
        window.scrollTo(0, 0);
        document.body.style.overflow = isActive ? '' : 'hidden';
        isActive ? document.getElementById('country').scrollIntoView() : '';
    }

    /* Modal end */


    const [title, setTitle] = useState(props.title);
    const [data, setData] = useState<any>({
        "mb": 0,
        "mbm": 0,
        "gb": 0,
        "gbm": 0
    })

    const [countries, setCountries] = useState([]);

    useEffect(() => {

        try {
            const load = async () => {
                const response = await fetch(`http://localhost:4200/countries`)
                const json = await response.json();

                setTitle(localStorage.getItem('country') || json[0].name);
                setCountries(json);
            }

            if (!props.title) {
                load();
            }
        } catch (e) {
        }

    }, []);

    const CountryList = () => {

        return (
            <ul className={`list-reset ${s.countryList}`}>
                {countries.map(item =>
                    <li className={title == item.name ? s.active : ''} key={item.name}>
                        <button className={'btn-reset'}
                                onClick={() => {
                                    setData({
                                        "mb": item.mb?.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '),
                                        "mbm": item.mbm?.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '),
                                        "gb": item.gb?.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '),
                                        "gbm": item.gbm?.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                                    })
                                    setTitle(item.name);
                                    localStorage.setItem('country', item.name)
                                }}>
                            {item.name}
                        </button>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <section id="country" className={s.country}>
            <Container className={s.container}>
                <Ticket/>

                <div className={s.desktopList}>
                    <input className={`input ${s.desktopSearch}`} type="search" placeholder={'Найти страну'}/>
                    <div className={s.main}>
                        <h5 className={s.startLetter}>A</h5>
                        {countries.length === 0 ? <Preloader/> : <CountryList/>}
                    </div>
                </div>

                <button onClick={toggleModal} className={`btn-reset ${s.countryBtn}`}>
                    <span className={s.text}>
                        <span className={s.btnTitle}>Выберите страну</span>
                        <p className={s.countryName}>{title ? title : <Preloader/>}</p>
                    </span>
                    <Chevron/>
                </button>
                <div className={s.tariffInfo}>
                    <div className={s.tariffMain}>
                        <h3 className={s.tariffDesktopTitle}>{title ? title : <Preloader/>}</h3>
                        <div className={`${s.tariff} ${s.left}`}>
                            <div className={s.col}>
                                <h4>Помегабайтный</h4>
                                <p>{data.mb ? data.mb : 0}₽</p>
                            </div>
                            <div className={s.col}>
                                <h4>100 мб</h4>
                                <p>{data.mbm ? data.mbm : 0} ₽</p>
                            </div>
                        </div>
                        <div className={`${s.tariff} ${s.right}`}>
                            <div className={s.col}>
                                <h4>1 гб</h4>
                                <p>{data.gb ? data.gb : 0} ₽</p>
                            </div>
                            <div className={s.col}>
                                <h4>10 гб</h4>
                                <p>{data.gbm ? data.gbm : 0} ₽</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.disclaimer}>
                        <Button>Подключить</Button>
                        <p className={s.disclaimerText}>
                            Приведена предварительная стоимость без учета колебания курса рубля и euro, актуальные
                            тарифы по
                            операторам и странам указаны в приложении eSIM pass.
                        </p>
                    </div>
                </div>

            </Container>
            <Modal toggleModal={toggleModal}
                   isActive={isActive}
                   countryList={<CountryList/>}
                   countries={countries}/>
        </section>
    )
}


