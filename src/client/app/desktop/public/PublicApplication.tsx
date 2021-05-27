import * as React from "react";

import { PagesHolder } from "./pages/PagesHolder";
import { Modals } from './modals/Modals';
import { connect } from "react-redux";
import { State } from "../../../redux/State";

export const PublicApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {

    const showWizard = () => {
        if (props.publicWizard) {
            return <Modals mode={props.publicWizard} />
        }
    }
        
    return (
        <div className="PublicApplication">
            <PagesHolder/>
            {showWizard()}
        </div>
    )
}


const mapStateToProps = (state : State) => ({
    publicWizard : state.publicWizard 
})

export const PublicApplication = connect(mapStateToProps)(PublicApplicationImpl)

