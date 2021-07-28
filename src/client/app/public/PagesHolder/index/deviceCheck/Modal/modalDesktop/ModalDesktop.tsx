import s from './ModalDesktop.module.scss';

export const ModalDesktop = () => {
    return (
        <div className={s.mainDesktop}>
            <div className={s.pickDevice}>
                <h3 className={s.pickTitle}>1. Выберите устройство</h3>
                <div className={s.devices}>
                    <button className={`btn-reset ${s.device} ${s.devicesTablet}`}></button>
                    <button className={`btn-reset ${s.device} ${s.devicesSmartphone}`}></button>
                    <button className={`btn-reset ${s.device} ${s.devicesWatch}`}></button>
                </div>
            </div>
        </div>
    )
}
