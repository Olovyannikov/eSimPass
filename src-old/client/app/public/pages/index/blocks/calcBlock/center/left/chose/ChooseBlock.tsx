import * as React from "react";
import { img_planeBig } from "./../../../../../../../../images";

export const ChooseBlock = () => {
    return (
        <div className="ChooseBlock">
            <div>
                Выберите страну в правом верхнем углу билета
            </div>
            <div>
                <img className='chose-block__img_plane-img' src={img_planeBig}/>
            </div>
        </div>
    )
}
