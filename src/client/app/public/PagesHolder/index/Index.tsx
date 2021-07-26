import {DeviceCheck} from "./deviceCheck/DeviceCheck";
import {AirplaneDash} from "../../../components/icons";
import {EsimTravelExample} from "./esimTravelExample/EsimTravelExample";
import {CountryChoose} from "./countryChoose/CountryChoose";

export const Index = () => {
    return (
        <main className={'main'}>
            <DeviceCheck/>
            <AirplaneDash/>
            <EsimTravelExample/>
            <CountryChoose/>
        </main>
    )
}
