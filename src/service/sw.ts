export default class AppSW {

    pwaSupport: boolean = false;

    constructor() {
        this.init();
    }

    init(): void {

        if ('serviceWorker' in navigator) {
            this.pwaSupport = true;
            //register the service worker
            navigator.serviceWorker.register('sw.js').then((reg) => {

                // registration worked
                // console.log('Service Worker registration succeeded. Scope is ' + reg.scope);


            }).catch((error) => {
                // registration failed
                console.log('Registration failed with ' + error);
            });


            navigator.serviceWorker.register('firebase-messaging-sw.js').then((reg) => {

                // registration worked
                // console.log('Service Worker registration succeeded. Scope is ' + reg.scope);


            }).catch((error) => {
                // registration failed
                console.log('Registration failed with ' + error);
            });



        } else {
            console.log("Service Workers Not Supported");

        }

    }

    isPwaSupported(): boolean {
        return this.pwaSupport;
    }


}