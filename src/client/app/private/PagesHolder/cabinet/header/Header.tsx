import s from './Header.module.scss';
import {Container} from "../container/Container";

export const Header = () => {
    return (
        <header className={s.header}>
            <Container></Container>
        </header>
    )
}
