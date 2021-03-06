import s from './CountryChoose.module.scss';
import {Container} from "../../../../components/container/Container";
import {Chevron, Preloader, Ticket} from "../../../../components/icons";
import {Button} from "../../../../components/button/Button";
import {useEffect, useState} from "react";
import {Modal} from "./modal/Modal";
import countriesList from './countries.json';
import {scrollToTop} from "../../../../components/scrollToTop/ScrollToTop";

interface CountryChooseModel {
    title?: string
}

export const CountryChoose = (props: CountryChooseModel) => {

    /* Modal start */

    const [isActive, setActive] = useState<boolean>(false);
    const toggleModal = () => {
        setActive(!isActive);
        scrollToTop();
        document.body.style.overflow = isActive ? '' : 'hidden';
        isActive ? document.getElementById('country').scrollIntoView({behavior: "smooth"}) : '';
    }

    /* Modal end */

    const [title, setTitle] = useState(props.title);
    const [data, setData] = useState<any>({
        "mb": 0,
        "mbm": 0,
        "gb": 0,
        "gbm": 0
    });

    const [countries, setCountries] = useState<any>([]);
    try {
        console.log(countries[0].name)
    } catch (e) {}

    useEffect(() => {

        try {
            const load = async () => {
                setTitle(localStorage.getItem('country') || countries[0]?.name);
                setCountries(countriesList);
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
                {countries.map((item: any) =>
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
                                    localStorage.setItem('country', item.name);
                                    window.innerWidth < 1200 ? toggleModal() : ''
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
                    <input className={`input ${s.desktopSearch}`} type="search" placeholder={'?????????? ????????????'}/>
                    <div className={s.main}>
                        <h5 className={s.startLetter}>A</h5>
                        {countries.length === 0 ? <Preloader/> : <CountryList/>}
                    </div>
                </div>

                <button onClick={toggleModal} className={`btn-reset ${s.countryBtn}`}>
                    <span className={s.text}>
                        <span className={s.btnTitle}>???????????????? ????????????</span>
                        <p className={s.countryName}>{title ? title : <Preloader/>}</p>
                    </span>
                    <Chevron/>
                </button>
                <div className={s.tariffInfo}>
                    <div className={s.tariffMain}>
                        <h3 className={s.tariffDesktopTitle}>{title ? title : <Preloader/>}</h3>
                        <div className={`${s.tariff} ${s.left}`}>
                            <div className={s.col}>
                                <h4>??????????????????????????</h4>
                                <p>{data.mb ? data.mb : 0}???</p>
                            </div>
                            <div className={s.col}>
                                <h4>100 ????</h4>
                                <p>{data.mbm ? data.mbm : 0} ???</p>
                            </div>
                        </div>
                        <div className={`${s.tariff} ${s.right}`}>
                            <div className={s.col}>
                                <h4>1 ????</h4>
                                <p>{data.gb ? data.gb : 0} ???</p>
                            </div>
                            <div className={s.col}>
                                <h4>10 ????</h4>
                                <p>{data.gbm ? data.gbm : 0} ???</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.disclaimer}>
                        <Button>????????????????????</Button>
                        <p className={s.disclaimerText}>
                            ?????????????????? ?????????????????????????????? ?????????????????? ?????? ?????????? ?????????????????? ?????????? ?????????? ?? euro, ????????????????????
                            ???????????? ????
                            ???????????????????? ?? ?????????????? ?????????????? ?? ???????????????????? eSIM pass.
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


