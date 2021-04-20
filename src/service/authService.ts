import Device from "../model/device";
import User from "../model/user";

export default class AuthService {

    firebase: any;
    authResult : any;

    constructor(_f: any) {
        this.firebase = _f;
    }

    isSignInSuccessWithAuthResult(): boolean {
        return !this.getAuthResult().credential || false;
    }

    // Signs-out of Friendly Chat.
    signOut(): void {
        // Sign out of Firebase.
        this.firebase.auth().signOut();
    }

    getAuthInstance(): any {
        return this.firebase.auth();
    }

    setAuthResult(_result: any): void {
        this.authResult = _result;
    }

    getAuthResult(): any {
        return this.authResult;
    }


    // Returns true if a user is signed-in.
    isUserSignedIn(): boolean {
        return !!this.firebase.auth().currentUser;
    }

    getCurrentUser(): any {
        if (this.isUserSignedIn()) {
            return this.firebase.auth().currentUser;
        }
        return null;
    }

    getCurrentUserId(): any {
        return this.getCurrentUser().uid || '';
    }

    getUser(): User {

        let u: User = new User(
            this.getAuthResult().user.photoURL || 'images/profile_placeholder.png',
            this.getAuthResult().user.displayName,
            this.firebase.auth().currentUser.email,
            this.isUserSignedIn()
        );
        u.setUId(this.getCurrentUserId());
        return u;
    }

     getDevice(): Device {
         return this.firebase.messaging().getToken().then((fcmToken) => {
             if (fcmToken) {
                 console.log('Got FCM device token:', fcmToken);
                 return new Device(fcmToken, this.getCurrentUserId());
             }
             return null;

         }).catch((error) => {
             console.error('Unable to get device token.', error);

         });
    }


}