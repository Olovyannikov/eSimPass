export const Container = (props: {children?: JSX.Element|JSX.Element[], className?: string}) => {
    return (
        <div className={`container ${props.className}`}>{props.children}</div>
    )
}

Container.defaultProps = {
    className: ''
}
