import * as React from "react";

import { img_visa, img_mir, img_masterCard } from "../../../../../../../resources/images";

export const InfoBlock = () => {

    return (
        <div className="InfoBlock">
            <div className="left-info-block">
                <p className="privacy">Политика конфиденциальности</p>
                <p className="privacy">Условия оказания услуг связи</p>
                <p className="privacy">Устройства поддерживающие eSIM</p>
                <p className="requisites">ООО “ГЛОНАСС МОБАЙЛ”</p>
                <p className="requisites">ОГРН 1197746459460</p>
                <p className="requisites">ИНН 7719494560</p>
                <p className="requisites">Юридический адрес:</p>
                <p className="requisites">107023, г. Москва, Семеновская площадь, 1а</p>
            </div>
            <div className="right-info-block">
                <img className="mir" src={img_mir} alt="МИР" />
                <img className="visa" src={img_visa} alt="VISA" />
                <img className="masterCard" src={img_masterCard} alt="Master Card" />
            </div>
        </div>
    )
}
