export default class Device {
    info: Object = {};
    createdAt: number = 0;
    geolocation: Object = {};
    fcmToken: string;
    uid: number | string;

    constructor(_token: string, _uid?: number| string) {
        this.fcmToken = _token || "";
        this.uid = _uid || "";
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

    setCreatedAt(_timestamp: number) {
        this.createdAt = _timestamp;
    }

    getCreateAt() {
        return this.createdAt;
    }

    getToken(){
        return this.fcmToken;
    }

    setToken(_t: string){
        this.fcmToken = _t;
    }


    getUId(): number | string {
        return this.uid;
    }

    setUId(_id: number | string): void {
        this.uid = _id;
    }


    getData(): Object {
        return {
            fcmToken: this.getToken(),
            uid: this.getUId(),
            geolocation: this.getGeolocation(),
            info: this.getInfo(),
            createdAt: this.getCreateAt()
        }
    }


}