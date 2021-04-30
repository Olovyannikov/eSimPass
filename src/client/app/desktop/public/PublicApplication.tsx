import * as React from "react";

import { PagesHolder } from "./pages/PagesHolder";
import { Modals } from './modals/Modals';
import { connect } from "react-redux";
import { State } from "../../../redux/State";
// import { useParams } from "react-router-dom";

import { useRouter } from 'next/router';
import { STATE_API } from "../../../redux/StateApi";
import Router from 'next/router';

export interface TokenModel {
    tokenVerify : string;
    tokenRestore : string;
}

export const PublicApplicationImpl = (props : ReturnType<typeof mapStateToProps>) => {

    const showWizard = () => {
        if (props.publicWizard) {
            return <Modals mode={props.publicWizard} />
        }
    }

    const router = useRouter()

    React.useEffect(() => console.log('routeer values',router), []);

    const handleRouterPath = () => {

    }

    // const { tokenVerify, tokenRestore } = useParams<TokenModel>();

    // const handlerTokenFromUrl = () => {
    //     if (tokenVerify) {
    //         STATE_API.showPublicWizard('verifyRegistration');
    //     }
    //     else if (tokenRestore) {
    //         STATE_API.showPublicWizard('verifyPasswordRestore');
    //     }
    // }

    // React.useEffect(() =>  {

    //     handlerTokenFromUrl()
        
    // }, [tokenVerify, tokenRestore])

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

