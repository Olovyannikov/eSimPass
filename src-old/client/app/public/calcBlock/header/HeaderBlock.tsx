import * as React from "react";

import img from "./../../../../img/plane-small.png"
import dividedLine from './../../../../img/divided-line.png';
import { Chooser } from "./chooser/Chooser";
import { ListRatesResponse } from "./../../../../../../server/container/cw2/generated/client.web";

interface Props {
    selected : (rate : ListRatesResponse.SuccessModel.RateModel) => void
}

export const HeaderBlock = (props : Props) => {

    // ?

    const [filter, setFilter] = React.useState (() : string => null)

    return (
        <div className="HeaderBlock">
            <div>
                <div className="plane">
                    <img src={img} />
                </div>
                <div className="question">
                    Сколько стоит интернет?
                </div>
                <img className='divided-line' src={dividedLine} alt="eSIM Travel"/>
                <div className="input">
                    <input placeholder="Укажите страну" onChange={e => setFilter (e.target.value)}/>
                </div>
                <Chooser filter={filter} selected={props.selected}/>
            </div>
        </div>
    )
}
