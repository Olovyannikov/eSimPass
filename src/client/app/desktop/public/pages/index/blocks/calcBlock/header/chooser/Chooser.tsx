import * as React from "react";
import { ListRatesResponse } from "../../../../../../../../../generated/proto.web";
import { Country } from "./country/Country";
import { nothingToNull } from '../../../../../../../../../utils';
import { State } from "../../../../../../../../../redux/State";
import { connect } from "react-redux";


interface Props extends ReturnType<typeof mapStateToProps> {
    filter : string,
    show : boolean,
    selected : (rate : ListRatesResponse.SuccessModel.RateModel) => void;
}



export const ChooserImpl = (props : Props) => {
    
    const [allRates, setAllRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => []);
    const [filteredRates, setFilteredRates] = React.useState (() : ListRatesResponse.SuccessModel.RateModel [] => []);

    React.useEffect (() => {
        const filter = nothingToNull (props.filter)
        setAllRates(prev => prev = props.listRates)
        
        if (filter != null) {
            setFilteredRates (filteredRates => filteredRates = allRates
                .filter (rate => rate.countryName.toLocaleLowerCase ().indexOf (filter.toLocaleLowerCase ()) >= 0)
            )
        }
        else {
            setFilteredRates (filteredRates => filteredRates = allRates)
        }

    }, [props.filter, allRates])
    
    const getDisplay = () => {
        if (props.show) {
            return "block"
        }
        else {
            return "none"
        }
    }

    return (
        <div className="Chooser" style={{display : getDisplay ()}}>
            {filteredRates && filteredRates.map (rate => <Country key={rate.countryId} model={rate} clicked={() => props.selected (rate)}/>)}
        </div>
    )
}

const mapStateToProps = (state : State) => ({
    listRates : state.listRates
})

export const Chooser = connect(mapStateToProps)(ChooserImpl)
