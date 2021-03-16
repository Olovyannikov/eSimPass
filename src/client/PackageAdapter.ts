import { ListDevicesResponse } from './generated/proto.web';

class PackageAdapter {

    public setPackage(packages : ListDevicesResponse.SuccessModel.DeviceModel[]) : void {
        window.localStorage.setItem('packages', JSON.stringify(packages))
    }

    public setActivePackage(packages: ListDevicesResponse.SuccessModel.DeviceModel[]) : void {
        const activePackages : ListDevicesResponse.SuccessModel.DeviceModel[] = []

        packages.map(el => {
            let empty : boolean;
            for (let i in el.currentPack) {
                if (el.currentPack.hasOwnProperty(i)) {
                    empty = false
                } 
                empty = true
            } 
            if (empty) {
                activePackages.push(el)
            }
        })
        
        window.localStorage.setItem('activePackages', JSON.stringify(activePackages));
    }

    public getPackages() {
        return window.localStorage.getItem('packages')
    }

    public getActivePackages() {
        let arrayOfPackage : ListDevicesResponse.SuccessModel.DeviceModel[] = JSON.parse(window.localStorage.getItem('activePackages'));
        return arrayOfPackage
    }
}

export const PACKAGES = new PackageAdapter();

