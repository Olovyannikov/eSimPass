import {useRouter} from "next/router";
import {Cabinet} from "./cabinet/Cabinet";

export const PagesHolder = () => {

    const router = useRouter();

    if (router.pathname === '/cabinet') {
        return <Cabinet/>
    }
}
