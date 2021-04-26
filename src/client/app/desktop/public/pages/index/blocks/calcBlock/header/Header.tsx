import * as React from "react";

import { Chooser } from "./chooser/Chooser";
import { img_dividedLine, img_planeSmall } from "./../../../../../../../../resources/images";
import { ListRatesResponse } from "./../../../../../../../../generated/proto.web";

interface Props {
    selected : (rate : ListRatesResponse.SuccessModel.RateModel) => void
}

export const Header = (props : Props) => {

    const [filter, setFilter] = React.useState (() : string => null)
    const [showChooser, setShowChooser] = React.useState (() : boolean => false)
    const [value, setValue] = React.useState (() : string => "")

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValue (value => value = e.target.value);
        setFilter (e.target.value)
    }

    const onSelected = (rate : ListRatesResponse.SuccessModel.RateModel) => {  
        props.selected (rate);
        
        setValue (value => value = rate.countryName);
        setShowChooser (focused => focused = false)
    }

    return (
        <div className="Header">
            <div className="plane">
                <img src={img_planeSmall} />
            </div>
            <div className="question">
                Сколько стоит интернет?
            </div>
            <div className="divider">
                <img className='divided-line' src={img_dividedLine}/>
            </div>
            <div className="input">
                <input placeholder="Укажите страну" value={value} onChange={onChange} onFocus={()=> setShowChooser (true)}/>
                <Chooser show={showChooser} filter={filter} selected={onSelected} />
            </div>
        </div>
    )
}

