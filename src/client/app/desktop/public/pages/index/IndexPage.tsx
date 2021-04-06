import * as React from "react";
import { HeaderBlock } from "./blocks/headerBlock/HeaderBlock";
import { LogoBlock } from "./blocks/logoBlock/LogoBlock";
import { CalcBlock } from "./blocks/calcBlock/CalcBlock";
import { TutorialBlock } from "./blocks/tutorialBlock/TutorialBlock";
import { WhyBlock } from "./blocks/whyBlock/WhyBlock";

export const IndexPage = () => {

    return (
        <div className="IndexPage">
            <HeaderBlock/>
            <LogoBlock/>
            <CalcBlock/>
            <TutorialBlock/>
            <WhyBlock/>
        </div>
    )
}