import * as React from "react";

import { PagesHolder } from "./pages/PagesHolder";
import { Modals } from './modals/Modals';
import { connect } from "react-redux";
import { State } from "../../redux/State";

export const PublicApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {

    const showWizard = () => {
        if (props.showAuthWizard) {
            return <Modals mode={props.showAuthWizard} />
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
    showAuthWizard : state.showAuthWizard 
})

export const PublicApplication = connect(mapStateToProps)(PublicApplicationImpl)
