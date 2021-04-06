import * as React from "react";

import { RightBlock } from "./rightBlock/RightBlock";
import { CountryBlock } from './left/country/CountryBlock';
import { ChooseBlock } from './left/chose/ChooseBlock';
import { ListRatesResponse } from "../../../../../../../../generated/proto.web";

interface Props {
    rate : ListRatesResponse.SuccessModel.RateModel
}

export const CenterBlock = (props : Props) => {

    const getLeftBlock = () => {

        if (props.rate) {
            return <CountryBlock rate={props.rate}/>
        }
        else {
            return <ChooseBlock />
        }
    }

    return (
        <div className="CenterBlock">
            {getLeftBlock ()}
            <RightBlock/>
        </div>
    )
}
