import {DeviceCheck} from "./deviceCheck/DeviceCheck";
import {AirplaneDash} from "../../../components/icons";
import {EsimTravelExample} from "./esimTravelExample/EsimTravelExample";
import {CountryChoose} from "./countryChoose/CountryChoose";
import {StepSlider} from "./stepSlider/StepSlider";
import {FAQ} from "./faq/FAQ";
import {Reasons} from "./reasons/Reasons";

export const Index = () => {
    return (
        <main className={'main'}>
            <DeviceCheck/>
            <AirplaneDash/>
            <EsimTravelExample/>
            <CountryChoose/>
            <StepSlider/>
            <FAQ/>
            <Reasons/>
        </main>
    )
}
