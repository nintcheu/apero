import User from "../model/user";

export default class UserDao {
    user: User;
    firebase: any;

    constructor(_f: any, _u: User) {
        this.firebase = _f;
        this.user = _u;
    }


    create(): any {
        this.user.setCreated(this.firebase.firestore.FieldValue.serverTimestamp());
    
        return this.firebase.firestore().collection('users').doc(this.user.getUId()).set(this.user.getModel());
    }

    update(_user: User): User {
        _user.setUpdatedAt(this.firebase.firestore.FieldValue.serverTimestamp());


        return _user;
    }

    delete(_user: User): boolean {
        let done: boolean = false;

        return done;
    }





}