import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import * as rx from "rxjs/Rx"
import { useHistory } from 'react-router';
import { CONNECTION } from '../../../../../Connection';
import { RegisterMobileRequest, RegisterMobileResponse } from '../../../../../generated/proto.web';
import { img_activeEye, img_disableEye, img_firstStep, img_next } from '../../../../../resources/images';
import { convertEndingOfNoun, waitForClose } from '../../../../../utils';
import { Spinner } from '../../components/spinner/Spinner';
import { VerifyRegistration } from './verifyRegistration/VerifyRegistration';

interface PasswordViewModel {
    img : string;
    type : 'text' | 'password';
} 

export const Registration = () => {

    const logger = new Logger ('Registration Dialog mobile');

    const closedSubject = waitForClose ();

    const history = useHistory();

    const [token, setToken] = React.useState<string>(null);
    const [successRegister, setSuccessRegister] = React.useState<boolean>(null)
    const [error, setError] = React.useState<string>('');
    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [passwordViewMode, setPasswordViewMode] = React.useState<PasswordViewModel>({
        img : img_activeEye,
        type : 'password',
    })
    
    const emailInput = React.useRef<HTMLInputElement>();
    const passwordInput = React.useRef<HTMLInputElement>();
    const passwordRepeatInput = React.useRef<HTMLInputElement>();

    const handlePasswordMode = () => {
        if (passwordViewMode.type === 'password') {
            setPasswordViewMode(prev => ({
                ...prev,
                img : img_disableEye,
                type : 'text',
            }))
        } 
        else {
            setPasswordViewMode(prev => ({
                ...prev,
                img : img_activeEye,
                type : 'password'
            }))
        }
    }

    const showError = () => {
        if (error) {
            return <div className="error">{error}</div>
        }
    }

    const handleRegister = () => {
        setInProgress(prev => prev = true)

        setError(null)
        setSuccessRegister(null)

        if (checkEqualsPassword ()) {

            CONNECTION.registerMobile(createRegisterRequest())
                .do(parseRegisterResponse)
                .takeUntil(closedSubject)
                .subscribe(logger.rx.subscribe('Error regist in'))
        }

    }

    const checkEqualsPassword = () => {
        if (!passwordInput.current.value || !passwordRepeatInput.current.value) {
            handlePlainError('Заполните все поля')
            return false;
        } 
        else if (passwordInput.current.value === passwordRepeatInput.current.value) {
            return true;
        }
        else {
            handlePlainError('Пароли не совпадают!')
            return false
        }
    }

    const parseRegisterResponse = (response : RegisterMobileResponse) => {
        
        if (response.emailAlreadyUsed) {
            handlePlainError('Аккаунт уже используется')
        }
        else if (response.invalidEmail) {
            handlePlainError('Неправильная почта')
        }
        else if (response.invalidPassword) {
            handleInvalidPasswordResponse();
        }
        else if (response.tooManyAttempts) {
            handleToManyErrorAttemptsResponse(response)
        }
        else if (response.expired) {
            handleRegister ()    
        }
        else if (response.success) {
            handleSuccessResponse(response)
        }
        // setInProgress(true)
    }

    const handleInvalidPasswordResponse = () => {
        if (passwordInput.current.value.length < 6 || passwordRepeatInput.current.value.length < 6) {
            handlePlainError('Пароль меньше шести символов');
        }
        else {
            setInProgress(prev => prev = false)
        }
    }

    const handleSuccessResponse = (response : RegisterMobileResponse) => {
        console.log(response.success.token);
        
        setToken(prev => prev = response.success.token);
        setInProgress(prev => prev = false);
        setSuccessRegister(prev => prev = true);
    }

    const handlePlainError = (error : string) => {
        setError(prev => prev = error);
        setInProgress(prev => prev = false);
    }

    // TODO redirect to store, download app
    // const handleLoginClicked = () => history.push('/login');

    const handleToManyErrorAttemptsResponse = (response : RegisterMobileResponse) => {
        let secondsToWait = Math.round (parseInt (response.tooManyAttempts) / 1000)
        
        rx.Observable.interval (1000)
            .map (r => secondsToWait - r)
            .do (secondsToWait => {
                
                if (secondsToWait > 0) {
                    setError(prev => prev = `Повторить можно через ${secondsToWait} ${convertEndingOfNoun(secondsToWait)}`);
                }
                else {
                    setInProgress(prev => prev = false)
                    setError(null)
                }
            })
            .takeWhile (secondsToWait => secondsToWait > 0)
            .takeUntil (closedSubject)
            .subscribe (logger.rx.subscribe ("Error register mobile in"))
    } 

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner />
        }
        else {
            return (
                <>
                    <div className="already-register">Уже зарегистрирован</div>
                    <img onClick={handleRegister} src={img_next} className='button-next' alt="Next"/>
                </>
            )
        }
    }

    const createRegisterRequest = () : RegisterMobileRequest => ({
        email : emailInput.current.value,
        password : passwordInput.current.value,
    })

    const showSuccessRegister = () => {

        if (successRegister) {
            return <VerifyRegistration token={token} email={emailInput.current.value} handleRegistration={handleRegister} />
        }
        else {
            return showInProgress();
        }
    }

    return (
        <div className="Registration">
            <div className="title">Подключение eSIM</div>
            <div className="text-step">Всего два шага для подключения</div>
            <img className='img-step' src={img_firstStep} alt="First Step"/>
            <div className="text-action">Зарегистрируйтесь в личном кабинете</div>
            <div className="inputs-block">
                <div className="attention-block">
                    <span>Внимание!</span>
                    <div className="attention">На эту почту мы отправим Вам QR-код</div>
                </div>
                <input ref={emailInput} disabled={inProgress} required name='email' className='input-email' placeholder='Эл.почта' type="text"/>
                <input ref={passwordInput} disabled={inProgress} required name='password' className='input-password' placeholder='Пароль' type={passwordViewMode.type}/>
                <div onClick={handlePasswordMode} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                <input ref={passwordRepeatInput} disabled={inProgress} required name='password' className='input-password' placeholder='Повторите пароль' type={passwordViewMode.type}/>
                <div onClick={handlePasswordMode} className="img-password">
                    <img src={passwordViewMode.img} alt="Eye"/>
                </div>
                {showError()}
                {showSuccessRegister()}
            </div>
        </div>
    )
}
 