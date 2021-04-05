export default class User {

    profilePicUrl: string;
    displayName: string;
    email: string;
    isSignIn: boolean = false;
    uid: number | string = '';
    createdAt: number = 0;
    updatedAt: number = 0;
    accessToken: string = '';


    constructor(_profilePictUrl?: string, _displayName?: string, _email?: string, _isLogged?: boolean) {
        this.profilePicUrl = _profilePictUrl || '';
        this.displayName = _displayName || '';
        this.email = _email || '';
        this.isSignIn = _isLogged || false;
    }


    getAccessToken(): string {
        return this.accessToken;
    }

    setAccessToken(_token: string) {
        this.accessToken = _token;
    }
    // Returns the signed-in user's profile pic URL.
    getProfilePicUrl(): string {
        return this.profilePicUrl;
    }

    // Returns the signed-in user's display name.
    getDisplayName(): string {
        return this.displayName;
    }

    getEmail(): string {
        return this.email;
    }

    // Returns true if a user is signed-in.
    isUserSignedIn(): boolean {
        return this.isSignIn;
    }

    isUserSignOut(): boolean {
        return !this.isSignIn;
    }

    getUId(): number | string {
        return this.uid;
    }

    setUId(_id: number | string): void {
        this.uid = _id;
    }

    setCreated(_timestamp: number) {
        this.createdAt = _timestamp;
    }

    getCreateAt() {
        return this.createdAt;
    }

    setUpdatedAt(_timestamp: number) {
        this.updatedAt = _timestamp;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }

 

    getModel(): Object {
        return {
            profilePicUrl: this.getProfilePicUrl(),
            displayName: this.getProfilePicUrl(),
            email: this.getEmail(),
            createdAt: this.getCreateAt(),
            updatedAt: this.getUpdatedAt(),
            isLogged: this.isUserSignedIn(),
            accessToken: this.getAccessToken(),
            uid: this.getUId()
        }
    }


}