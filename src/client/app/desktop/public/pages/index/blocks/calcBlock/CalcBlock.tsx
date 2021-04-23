import * as React from "react";
import { ListRatesResponse } from "../../../../../../../generated/proto.web";

import { CenterBlock } from "./center/CenterBlock";
import { Header } from "./header/Header";

export const CalcBlock = () => {

    const [rate, setRate] = React.useState (() : ListRatesResponse.SuccessModel.RateModel => null)

    return (
        <div className="CalcBlock">
            <div>
                <Header selected={setRate}/>
            </div>
            <CenterBlock rate={rate}/>
            <div className="footer"/>
        </div>
    )
}
