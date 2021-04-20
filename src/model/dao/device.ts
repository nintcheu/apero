import Device from "../device";

export default class DeviceDao {

    firebase: any;


    constructor(_f: any) {
        this.firebase = _f;
    }


    create(device: Device): any {
        device.setCreatedAt(this.firebase.firestore.FieldValue.serverTimestamp());
        // Saving the Device Token to the datastore.
        return this.firebase.firestore().collection('devices').doc(device.getToken())
            .set(device.getData());
    }

    update(device: Device): void {


    }






}