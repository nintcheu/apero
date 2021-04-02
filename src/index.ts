import FormData from './formData';
import NavBar from './component/navBar';
import Tooltip from './component/Tooltip';
import Select from './component/select';
import Tab from './component/tab';
import Carousel from './component/carousel';
import Modal from './component/modal';
import DatePicker from './component/datePicker';
import FloatingBtnMenu from './component/floatingBtnMenu';
import Chip from './component/chip';
import M from './../node_modules/materialize-css';
import firebase from './../node_modules/firebase/app';
import "./../node_modules/firebase/messaging";


import App from './app';
import NotificationCS from './notification';
import Auth from './auth';
import AppSW from './service/sw';


document.addEventListener('DOMContentLoaded', (e) => {

    const apiKeyMessaging = "BN_nyB9Ft4EDnHjHZX4dwLrh5W1i3OhJdjNNopmY_5WxnLy7_8vi8SliXNhWT0E8RM_xDrnaBDPGlIH7_gwPyjU";
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

    window.onhashchange = function () {
        console.log("onhashchange");
        //Header is fixed, need to slide down some to see sectionHead
        setTimeout(() => {
            scrollBy(0, -110);
            console.log("...scrollBy 0,-110");
        }, 10);

    }


    let nav = new NavBar(document, M);
    nav.init();

    let TooltipElements = new Tooltip(document, M);
    TooltipElements.init();

    let selectElements = new Select(document, M);
    selectElements.init();

    let tabElements = new Tab(document, M);
    tabElements.init();

    let modalElements = new Modal(document, M);
    modalElements.init();

    let carouselElements = new Carousel(document, M);
    carouselElements.init();

    let datePickerElements = new DatePicker(document, M);
    datePickerElements.init();

    let chipElements = new Chip(document, M);
    chipElements.init();

    let floatMenuBtn = new FloatingBtnMenu(document, M);
    floatMenuBtn.init();
    floatMenuBtn.addListener();

    let auth = new Auth(firebase.initializeApp(firebaseConfig), modalElements.getCurrentModal() as HTMLElement);
    auth.init();
    

    let aperoSW = new AppSW();

    let aperoApp = new App(aperoSW.isPwaSupported(), M);
    aperoApp.init();
    aperoApp.initInstallFeature();

    const form = document.querySelector('form')!;
    //console.log("form: " + form);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            const data = formData.getKeyValues();
            console.log(data);

        });
    }





    function displayNotification() {

      }


// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.


const messaging = firebase.messaging();

messaging.requestPermission().then(()=> {
    console.log("Have permission");
    return  messaging.getToken();

}).then( (token) =>{

    console.log(token);

}).catch((err)=> {
    console.log("Error Occured", err);
});


let notificationCS = new NotificationCS();

// [START messaging_receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
messaging.onMessage((payload) => {
    console.log('onMessage', payload);
    let option = notificationCS.getOptions(payload.notification.title);
    notificationCS.notify(payload.notification.title, option);
  });
  // [END messaging_receive_message]
  
});