import User from "../user";

export default class UserDao {
    firebase: any;

    constructor(_f: any) {
        this.firebase = _f;
    }


    create(u: User): any {
        u.setCreated(this.firebase.firestore.FieldValue.serverTimestamp());
    
        return this.firebase.firestore().collection('users').doc(u.getUId()).set(u.getData());
    }

    update(u: User): void {
       
    }







}