export default class SW {

    pwaSupport: boolean = false;

    init(): void {

        if ('serviceWorker' in navigator) {
            this.pwaSupport = true;
            //register the service worker
            navigator.serviceWorker.register('sw.js').then( (reg) => {

                // registration worked
               console.log('Service Worker registration succeeded. Scope is ' + reg.scope);

               if('Notification' in window){
                    console.log("Notification supported");
                    Notification.requestPermission((status)=>{
                        console.log("Notification permission status: " , status);
                    });
                    
                    this.notify("Bienvenue sur la plateforme Apéro!!!");
               } 
                
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

    notify(title: string): void {
        if(Notification.permission === 'granted'){
            navigator.serviceWorker.ready.then((reg) => {
                reg.showNotification(title);
            });
        }
    }

}