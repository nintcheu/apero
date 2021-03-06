export default class SW {



    init(): void {

        if ('serviceWorker' in navigator) {
            //register the service worker
            navigator.serviceWorker.register('sw.js').then( (reg) => {

                // registration worked
                console.log('Service Worker registration succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
                // registration failed
                console.log('Registration failed with ' + error);
            });


        } else {
            console.log("Service Workers Not Supported");

        }

    }

}