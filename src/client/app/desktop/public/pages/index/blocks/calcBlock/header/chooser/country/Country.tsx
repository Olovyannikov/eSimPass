import * as React from "react";
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

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
