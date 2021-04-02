export default class AppSW {

    pwaSupport: boolean = false;
    notificationSC: any;


    constructor(_notificationService: any) {
        this.notificationSC = _notificationService;
        this.init();
    }

    init(): void {

        if ('serviceWorker' in navigator) {
            this.pwaSupport = true;
            //register the service worker
            navigator.serviceWorker.register('sw.js').then((reg) => {

                // registration worked
               // console.log('Service Worker registration succeeded. Scope is ' + reg.scope);

                    this.notificationSC.notify("Bienvenue sur la plateforme Apéro!!!");
                

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