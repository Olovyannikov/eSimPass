import * as rx from "rxjs/Rx"
import { Logger } from "@glonassmobile/codebase-web/Logger";
import { nothingToNull } from "./utils";
import { ListDevicesResponse } from './generated/proto.web';

class StorageAdapter {

    private readonly logger = new Logger (StorageAdapter.name)
    
    public  readonly VERSION = "1.0.0-SNAPSHOT";
    private readonly STORE_EMAIL = 'email';
    private readonly DOCUMENT_UPLOADED = 'documentUploaded';
    private readonly STORE_DEVICES = 'devices';

    private storage = new Map<string,any> ();

    public readonly storeEmail = (email : string) => this.store (this.STORE_EMAIL, email);

    public readonly storeDocumentUploaded = (documentUploaded : boolean) => this.store (this.DOCUMENT_UPLOADED, documentUploaded);

    public readonly storeDevices = (devices : ListDevicesResponse.SuccessModel.DeviceModel[]) => this.store(this.STORE_DEVICES, devices);

    public readonly getDevices = () => {
        const result = this.getFromStore<ListDevicesResponse.SuccessModel.DeviceModel[]>(this.STORE_DEVICES);

        if (result) {
            return rx.Observable.of(result)
        }
        else {
            return rx.Observable.empty()
        }
    }

    public readonly deleteDevice = (deviceId : string) => {
        const result = this.getFromStore<ListDevicesResponse.SuccessModel.DeviceModel[]>(this.STORE_DEVICES)

        if (result) {
            this.storeDevices(result.filter(el => el.deviceId !== deviceId))
        }
    }

    public readonly getEmail = () => {
        const result = this.getFromStore <string>(this.STORE_EMAIL);

        if (result) {
            return rx.Observable.of(result)
        }
        else {
            return rx.Observable.empty ()
        }
    }

    public readonly getDocumentUploaded = () => {
        const result = this.getFromStore<boolean>(this.DOCUMENT_UPLOADED);

        if (result) {
            return rx.Observable.of(result);
        } 
        else {
            return rx.Observable.empty();
        }
    }

    private readonly getFromStore = <T>(key : string) => {
        const storedObjectWrapperJson = nothingToNull (window.localStorage.getItem (key));

        if (storedObjectWrapperJson) {
            try {
                const storedObjectWrapper = JSON.parse (storedObjectWrapperJson) as {
                    version : string,
                    object : T
                };

                if (storedObjectWrapper.version != this.VERSION) {
                    window.localStorage.removeItem (key)    
                    return null;
                }
                else {
                    return storedObjectWrapper.object
                }
            }
            catch (error) {
                this.logger.error (`Error parsing ${storedObjectWrapperJson} by ${key}`, error)
                return null;
            }
        }
        else {
            return null;
        }
    }

    private readonly store = <T>(key : string, object : T) => window.localStorage.setItem (key, JSON.stringify (this.createVersionWrapper (object)))

    private createVersionWrapper = <T>(object : T) => ({
        version : this.VERSION,
        object : object
    })

    public setToken = (token : string) : void => {
        window.localStorage.setItem('token', token)
    }

    public deleteToken = () : void => {
        window.localStorage.removeItem('token')
    }

    public getToken = () : string => {
        return window.localStorage.getItem('token')
    }

    public clear = () : void => {
        window.localStorage.clear()
    }
}

export const STORAGE = new StorageAdapter();

