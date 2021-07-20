import s from './Container.module.scss';

export const Container = (props: {children?: JSX.Element|JSX.Element[], className?: string}) => {
    return (
        <div className={`container ${props.className}`}>{props.children}</div>
    )
}