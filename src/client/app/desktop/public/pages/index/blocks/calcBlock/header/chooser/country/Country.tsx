import * as rx from "rxjs/Rx"
import * as React from "react";
import { ListRatesResponse } from "../../../../../../../../../../generated/proto.web";
 

interface Props {
    model : ListRatesResponse.SuccessModel.RateModel,
    clicked : () => void
}

export const Country = (props : Props) => {

    return (
        <div className="Country" onClick={props.clicked}>
            <div>{props.model.countryName}</div>
        </div>
    )
}
