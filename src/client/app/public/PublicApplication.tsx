import * as React from "react";

import { PagesHolder } from "./pages/PagesHolder";
import { Modals } from './modals/Modals';
import { connect } from "react-redux";
import { State } from "../../redux/State";
import { useParams } from "react-router-dom";
import { STATE_API } from "../../redux/StateApi";

export interface TokenModel {
    token : string
}

export const PublicApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {

    const showWizard = () => {
        if (props.showAuthWizard) {
            return <Modals mode={props.showAuthWizard} />
        }
    }

    const { token } = useParams<TokenModel>();

    const handlerTokenFromUrl = (token : string) => {
        if (token) {
            STATE_API.showAuthWizard('verify');
        }
    }

    React.useEffect(() =>  {

        handlerTokenFromUrl(token)
        
    }, [token])

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
