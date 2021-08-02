import {PagesHolder} from "./PagesHolder/PagesHolder";
import * as React from "react";
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";

export const PublicApplication = () => {
    return (
        <>
            <Header/>
            <PagesHolder/>
            <Footer/>
        </>
    )
}
