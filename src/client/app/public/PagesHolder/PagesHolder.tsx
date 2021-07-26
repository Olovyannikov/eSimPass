import {useRouter} from "next/router";
import {Index} from "./index/Index";

export const PagesHolder = () => {

    const router = useRouter();
        return <Index/>
}
