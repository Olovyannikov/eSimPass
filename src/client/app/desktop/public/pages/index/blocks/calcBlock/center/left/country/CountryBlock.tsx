import * as React from "react";

import { PricesBlock } from './prices/PricesBlock';
import { Header } from "./header/Header";
import { ListRatesResponse } from "../../../../../../../../../../generated/proto.web";

export interface Props {
    rate : ListRatesResponse.SuccessModel.RateModel
}

export const CountryBlock = (props : Props) => {
    return (
        <div className="CountryBlock">
            <Header rate={props.rate}/>
            <PricesBlock rate={props.rate}  />            
        </div>
    )
}
