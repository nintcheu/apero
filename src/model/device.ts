import User from "./user";

export default class Device {
    info: Object = {};
    createdAt: number = 0;
    geolocation: Object = {};
    token: string = '';
    uid: number | string = '';

    constructor(_token: string, _u: number| string) {
        this.token = _token;
        this.uid = _u;
    }

    getInfo(): Object {
        return this.info;
    }

    setInfo(_info: Object): void {
        this.info = _info;
    }

    getGeolocation(): Object {
        return this.geolocation;
    }

    setGeolocation(_location: Object): void {
        this.geolocation = _location;
    }

    setCreated(_timestamp: number) {
        this.createdAt = _timestamp;
    }

    getCreateAt() {
        return this.createdAt;
    }

    getToken(){
        return this.token;
    }

    setToken(_t: string){
        this.token = _t;
    }


    getUId(): number | string {
        return this.uid;
    }

    setUId(_id: number | string): void {
        this.uid = _id;
    }


    getModel(): Object {
        return {
            token: this.getToken(),
            uid: this.uid,
            geolocation: this.getGeolocation(),
            info: this.getInfo(),
        }
    }

}