import * as React from 'react';

import { img_next, img_activeEye, img_disableEye } from '../../../../resources/images';

interface IPassword {
    img : string;
    type : 'text' | 'password';
}

export const Login = () => {

    const [password, setPassword] = React.useState<IPassword>({
        img : img_activeEye,
        type : 'password'
    })

    const handleShowPassword = () => {
        if (password.type === 'password') {
            setPassword({
                img : img_disableEye,
                type : 'text'
            })
        } else {
            setPassword({
                img : img_activeEye,
                type : 'password'
            })
        }
    }

    return (
        <div className="Login" onClick={(e) => e.stopPropagation ()}>
            <div className="title">Войти в личный кабинет</div>
            <div className="inputs-block">
                <input required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                <input required name='password' className='input-password' placeholder='Пароль' type={password.type}/>
                <div onClick={handleShowPassword} className="img-password">
                    <img src={password.img} alt="Eye"/>
                </div>
                <img src={img_next} className='button-next' alt="Next"/>
                <div className="forgot-password">Восстановить пароль</div>
            </div>
        </div>
    )
}
