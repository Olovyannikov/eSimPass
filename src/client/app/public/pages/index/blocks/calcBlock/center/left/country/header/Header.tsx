import * as React from "react";
import { ListRatesResponse } from "../../../../../../../../../../generated/proto.web";

export interface Props {
    rate : ListRatesResponse.SuccessModel.RateModel
}

export const Header = (props : Props) => {
    return (
        <table className="Header" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td>
                        <div className="flag-icon-background flag-icon-gr"/>
                    </td>
                    <td>
                        <div>
                            {props.rate.countryName}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
