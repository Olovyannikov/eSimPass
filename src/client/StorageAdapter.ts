class StorageAdapter {

    public setToken(token : string) : void {
        window.localStorage.setItem('token', token)
    }

    public deleteToken() : void {
        window.localStorage.removeItem('token')
    }

    public getToken() : string {
        return window.localStorage.getItem('token')
    }
}

export const STORAGE = new StorageAdapter();

