//importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

import firebase from './../../node_modules/firebase/app';
import "./../../node_modules/firebase/messaging";
import NotificationCS from './../notification';


const firebaseConfig = {
  apiKey: "AIzaSyDeTPGZJmgE6pJ_IYLOOdPLaE5YlRBjUeo",
  authDomain: "apero-68e78.firebaseapp.com",
  databaseURL: "https://apero-68e78-default-rtdb.firebaseio.com",
  projectId: "apero-68e78",
  storageBucket: "apero-68e78.appspot.com",
  messagingSenderId: "94438058503",
  appId: "1:94438058503:web:457015fa059625ce6318a2",
  measurementId: "G-J7CTL6B73M"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();
let notificationCS = new NotificationCS();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage((payload) => {
    console.log('onBackgroundMessage', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: payload.data.status,
      icon: "images/android-chrome-192x192.png",
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });


