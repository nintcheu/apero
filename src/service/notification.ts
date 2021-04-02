export default class NotificationCS {
    messaging: any;

    constructor(_apiKey: string, _messaging: any,) {
        this.setMessaging(_messaging);
        this.setConfig(_messaging);
    }

    setMessaging(_messaging: any) {
        this.messaging = _messaging;
    }

    getMessaging(): any {
        return this.messaging;
    }

    setConfig(_apiKey: string): void {
        // Add the public key generated from the console here.
        this.messaging.getToken({ vapidKey: _apiKey });
    }



    notify(title: string, options?: Object): void {
        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    navigator.serviceWorker.ready.then((reg) => {
                        if (options instanceof Object) {
                            reg.showNotification(title, options);
                        } else {
                            reg.showNotification(title);
                        }
                    });
                }
            });
        }
    }

    getOptions(): Object {
        let s: number = Date.now();
        return {
            body: "See last posts",
            icon: "images/android-chrome-192x192.png",
            data: {
                timestamp: s,
                loc: "detail.html?id=" + s
            },
            actions: [{
                action: "go", title: "Go now!" + s,
            }],
        }

    }


}
