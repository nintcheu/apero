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

    // get the device token.
    async getCurrentDeviceToken(): Promise<string> {
        await this.firebase.messaging().getToken().then((currentToken) => {
            if (currentToken) {
                console.log('Got FCM device token:', currentToken);
                return currentToken;
            } else {
                return '';
            }

        }).catch((error) => {
            console.error('Unable to get device token.', error);

        });

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

    async getDevice(): Promise<Device> {
        let _deviceToken = await this.getCurrentDeviceToken();
        return new Device(_deviceToken, this.firebase.firestore.FieldValue.serverTimestamp());
    }


}