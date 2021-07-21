import s from './Button.module.scss';
import Link from "next/link";

interface ButtonModel {
    color?: string;
    size?: string;
    children?: JSX.Element | JSX.Element[] | string;
    onClick?: VoidFunction;
    isLink?: boolean;
    href?: string;
    disabled?: boolean
}

export const Button = (props: ButtonModel) => {
    let buttonClass;

    if (props.color === 'primary') {
        buttonClass = `${s.primary}`
    } else if (props.color === 'secondary') {
        buttonClass = `${s.secondary}`
    }

    if (props.size === 'large') {
        buttonClass += ` ${s.large}`
    } else if (props.size === 'medium') {
        buttonClass += ` ${s.medium}`
    } else if (props.size === 'small') {
        buttonClass += ` ${s.small}`
    } else if (props.size === 'huge') {
        buttonClass += ` ${s.huge}`
    }

    if (props.isLink) {
        return (
            <Link href={props.href}>
                <a className={`${s.btn} ${buttonClass}`}>{props.children}</a>
            </Link>
        )
    } else {
        return (
            <button disabled={props.disabled} onClick={props.onClick} type={'button'} className={`${s.btn} ${buttonClass}`}>
                {props.children}
            </button>
        )
    }
}

Button.defaultProps = {
    isLink: false,
    size: 'medium',
    disabled: false
}
