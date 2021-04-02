
export default class NotificationCS {
 

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

getOptions(_body): Object {
    let s: number = Date.now();
    return {
        body: _body,
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
  displayNotification(): void {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg: any) {
        var options = {
          body: 'Here is a notification body!',
          icon: 'images/android-chrome-192x192.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Hello world!', options);
      });
    }
  }


}









