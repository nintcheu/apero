import Device from "../model/device";
import User from "../model/user";

export default class DeviceDao {

    device: Device;
    firebase: any;


    constructor(_f: any, _d: Device) {
        this.firebase = _f;
        this.device = _d;
    }


    create(): any {
        this.device.setCreated(this.firebase.firestore.FieldValue.serverTimestamp());
        // Saving the Device Token to the datastore.
       return this.firebase.firestore().collection('fcmTokens').doc(this.device.getToken())
            .set(this.device.getModel());
    }


delete (): void {

}

    



}