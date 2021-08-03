import s from './ModalDesktop.module.scss';
import {Smartphone, Tablet, Watches} from "../../../../../../components/icons";
import {useState} from "react";

const buttons = [
    {icon: <Tablet/>, text: 'Планшет'},
    {icon: <Smartphone/>, text: 'Смартфон'},
    {icon: <Watches/>, text: 'Часы'},
];

const maintainers = [
    {
        name: 'Apple',
        devices: ['iPhone XR', 'iPhone 8']
    },
    {
        name: 'Samsung',
        devices: ['Galaxy A3', 'Super-puper mobila']
    },
    {
        name: 'Google',
        devices: ['Pixel 3', 'Ne Pixel 3']
    },
]

export const ModalDesktop = () => {

    const [isChosen, setChoose] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState(-1);

    const handleItemClick = (id: any) => {
        if (selectedItem !== id) {
            setSelectedItem(id);
            setChoose(!isChosen);
        }
    }

    return (
        <div className={s.mainDesktop}>
            <div className={s.pickDevice}>
                <h3 className={s.pickTitle}>1.Выберите устройство</h3>
                <div className={s.devices}>
                    {buttons.map((item: any, id: any) => (
                        <button id={id} key={id} onClick={(e: any) => handleItemClick(e.target.id)}
                                className={`btn-reset ${s.device} ${selectedItem == id ? s.active : ''}`}>{item.icon}<span>{item.text}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className={`${s.pickDevice} ${s.maintainers}`}>
                <h3 className={s.pickTitle}>2.Выберите производителя</h3>
                <ul className={`list-reset ${s.maintainerList}`}>
                    {maintainers.map((item: any, id: any) => (
                        <li key={id}>
                            <button id={item.name} className={`btn-reset`}>{item.name}</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`${s.pickDevice} ${s.deviceList}`}>
                <h3 className={s.pickTitle}>3.Проверьте устройство</h3>
                <ul className={`list-reset ${s.maintainerList}`}>
                    {maintainers.map((item: any, id: any) => {
                        item.devices.map((device: any) => (
                            <li key={id}>
                                {device}
                            </li>
                        ))
                    })}
                </ul>
            </div>
        </div>
    )
}
