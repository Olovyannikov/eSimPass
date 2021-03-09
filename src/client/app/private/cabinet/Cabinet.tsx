import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './../../../redux/State';

import { Navbar } from './navbar/Navbar';
import { BalanceBlock } from './balance/BalanceBlock';
import { PackageBlock } from './packageBlock/PackageBlock';
import { MenuBlock } from './menuBlock/MenuBlock';
import { SettingBlock } from './menuBlock/settingBlock/SettingBlock';
import { IMenuItem } from './../../components/menuItem/MenuItem';
import { devicesData } from './../../mockDevices';
import { DevicesBlock } from './menuBlock/devicesBlock/DevicesBlock';
import { useSelector } from 'react-redux';

import { BuyQrBlock } from './menuBlock/buyQrBlock/BuyQrBlock';
import { LoyaltyBlock } from './menuBlock/loyaltyBlock/LoyaltyBlock';
import { STATE_API } from '../../../redux/StateApi';
import { DetailedBlock } from './menuBlock/detailedBlock/DetailedBlock';
import { SupportBlock } from './menuBlock/supportBlock/SupportBlock';

import support from './../../../img/support.png';
import devices from './../../../img/wifi.png';
import detail from './../../../img/detail.png';
import change from './../../../img/change.png';
import loyalty from './../../../img/loyalty.png';
import settings from './../../../img/settings.png';
import activeSupport from './../../../img/active-support.png';
import activeDevices from './../../../img/active-devices.png';
import activeDetail from './../../../img/active-detail.png';
import activeChange from './../../../img/active-change.png';
import activeLoyalty from './../../../img/active-loyalty.png';
// import activeSettings from './../../../img/active-settings.png';
 
const items : IMenuItem[] = [{
    icon : {
        active : activeDevices,
        disabled : devices
    },
    text : 'Подключенные устройства',
    className : 'devices',
}, {
    icon : {
        active : activeDetail,
        disabled : detail
    },
    text : 'Детализация',
    className : 'detail',
},{
    icon : {
        active : activeChange,
        disabled : change,
    },
    text : 'Купить QR-код',
    className : 'change',
},{
    icon : {
        active : activeLoyalty,
        disabled : loyalty,
    },
    text : 'Программа лояльности',
    className : 'loyalty',
}, {
    icon : {
        active : activeSupport,
        disabled : support
    },
    text : 'Поддержка',
    className : 'support',
}, {
    icon : {
        active : settings,
        disabled : settings
    },
    text : 'Настройки',
    className : 'settings',
}]


const CabinetImpl = ({auth, menu} : ReturnType<typeof mapStateToProps>) => {

    React.useEffect(() => {
        STATE_API.setDevices(devicesData)
    }, [])

    const devices = useSelector(({devices} : State) => devices)

    const Menu = () => {
        if (menu === 'devices') {
            return <DevicesBlock devices={devices} />
        }
        else if (menu === 'settings') {
            return <SettingBlock />
        }
        else if (menu === 'change') {
            return <BuyQrBlock />
        }
        else if (menu === 'detail') {
            return <DetailedBlock />
        }
        else if (menu === 'loyalty') {
            return <LoyaltyBlock />
        }
        else if (menu === 'support') {
            return <SupportBlock />
        } 
        else return <></>
    }

    return (
        <div className='CabinetHolder'>
            <div className="Cabinet">
                <Navbar login={auth.login} />
                <BalanceBlock />
                <PackageBlock devices={devices}  />
                <MenuBlock active={menu} menuItems={items}/>
                <Menu />
            </div>
        </div>
    )
}

const mapStateToProps = (state : State) => ({
    auth : state.auth,
    menu : state.menu
})

export const Cabinet = connect(mapStateToProps)(CabinetImpl)
