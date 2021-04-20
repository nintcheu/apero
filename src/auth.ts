import * as firebaseui from './../node_modules/firebaseui';
import firebaseauth from './../node_modules/firebase/auth';
import firebase from './../node_modules/firebase/app';
import AuthService from './service/authService';
import UserDao from './model/dao/user';
import DeviceDao from './model/dao/device';

export default class Auth {

    currentModal: HTMLElement;
    firebase: any;
    pwa: boolean = false;

    constructor(_f: any, _pwa:boolean, _modal: HTMLElement) {
        this.currentModal = _modal;
        this.firebase = _f;
        this.pwa = _pwa;
    }

    init(): void {


        let _profileAccessToken = window.localStorage.getItem('_profileAccessToken') || null;
        let _profileDisplayName = window.localStorage.getItem('_profileDisplayName') || null;
        let _profileEmail = window.localStorage.getItem('_profileEmail') || null;
        let _profilePhotoUrl = window.localStorage.getItem('_profilePhotoUrl') || null;

        document.querySelectorAll('.granted').forEach((element) => {
            element.style.display = "none";
        });

        console.log("_profileAccessToken: " + _profileAccessToken);


        if (_profileAccessToken) {

            document.querySelector('#profileBackground').setAttribute("style", "display:block");
            document.querySelector('#profilePhoto img').setAttribute('style', "display:block");
            document.querySelector('#profilePhoto img').setAttribute('src', window.localStorage.getItem("_profilePhotoUrl"));
            document.querySelector('#profileDisplayName').appendChild(document.createTextNode(window.localStorage.getItem("_profileDisplayName")));
            document.querySelector('#profileEmail').appendChild(document.createTextNode(window.localStorage.getItem("_profileEmail")));
            document.querySelector('#disconnectLink').setAttribute("style", "display:block");

            document.querySelectorAll('.granted').forEach((element) => {
                element.style.display = "block";
            });

        }


        // firebase auth 

        // Initialize the FirebaseUI Widget using Firebase.
        let ui = new firebaseui.auth.AuthUI(this.firebase.auth());
        console.log('this.firebase.auth(): ', this.firebase.auth());

        let authService = new AuthService(this.firebase);

        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    console.log("authResult", authResult);
                    console.log("redirectUrl", redirectUrl);

                    authService.setAuthResult(authResult);

                    if (authResult.credential) {

                        let user = authService.getUser();
                        user.setAccessToken(authResult.credential.accessToken);
                        let userDao = new UserDao(this.firebase);
                        userDao.create(user);

                        if(this.pwa){
                            
                            authService.getDevice().then((device) => {

                                if(device){
                                    let deviceDao = new DeviceDao(this.firebase);
                                    deviceDao.create(device);
                                }
                               
                            }).catch((err) => {
                                console.log("create device failed: ", err);
                            });
                        }



                        _profileAccessToken = authResult.credential.accessToken;
                        window.localStorage.setItem('_profileAccessToken', _profileAccessToken);


                    }

                    if (authResult.user) {

                        //console.log(authResult.user.displayName);
                        _profileDisplayName = authResult.user.displayName;
                        window.localStorage.setItem('_profileDisplayName', _profileDisplayName);


                        //console.log(authResult.user.email);
                        _profileEmail = authResult.user.email;
                        window.localStorage.setItem('_profileEmail', _profileEmail);

                        //console.log(authResult.user.photoURL);
                        _profilePhotoUrl = authResult.user.photoURL;
                        window.localStorage.setItem('_profilePhotoUrl', _profilePhotoUrl);

                        //console.log(authResult.user.metadata.lastSignInTime);

                        document.querySelector('#profileBackground').setAttribute("style", "display:block");
                        document.querySelector('#profilePhoto img').setAttribute('style', "display:block");
                        document.querySelector('#profilePhoto img').setAttribute('src', window.localStorage.getItem("_profilePhotoUrl"));
                        document.querySelector('#profileDisplayName').appendChild(document.createTextNode(window.localStorage.getItem("_profileDisplayName")));
                        document.querySelector('#profileEmail').appendChild(document.createTextNode(window.localStorage.getItem("_profileEmail")));
                        document.querySelector('#disconnectLink').setAttribute("style", "display:block");

                        document.querySelectorAll('.granted').forEach((element) => {
                            element.style.display = "block";
                        });

                    }



                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return false;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    //document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/',
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    scopes: [
                        'https://www.googleapis.com/auth/contacts.readonly'
                    ],
                    customParameters: {
                        // Forces account selection even when one account
                        // is available.
                        prompt: 'select_account'
                    }
                },
            ],
            // Terms of service url.
            //tosUrl: '<your-tos-url>',
            // Privacy policy url.
            //privacyPolicyUrl: '<your-privacy-policy-url>'
        };


        // The start method will wait until the DOM is loaded.
        if (!_profileAccessToken) {
            ui.start('#firebaseui-auth-container', uiConfig);
        }





        var modal_elems_links = document.querySelectorAll('.modal .modal-footer a');
        modal_elems_links.forEach((href) => {

            href.addEventListener("click", (e) => {
                let modalID = href.parentNode.parentNode.getAttribute("id");
                let valueBtnClicked = e.target.firstChild.data;

                console.log("modalID: " + modalID + ", valueBtnClicked: " + valueBtnClicked);
                //console.log("_accessToken: " + _profileAccessToken);
                //this.currentModal.getAttribute('id') == "modal-disconnect" 
                if (valueBtnClicked == "OUI") {

                    this.firebase.auth().signOut().then((e) => {

                        console.log("sign-out" + e);

                        document.querySelectorAll('.granted').forEach((element) => {
                            element.style.display = "none";
                        });

                        _profileAccessToken = null;
                        _profilePhotoUrl = null;
                        _profileDisplayName = null;

                        window.localStorage.setItem('_profilePhotoUrl', _profilePhotoUrl);
                        window.localStorage.setItem('_profileDisplayName', _profileDisplayName);
                        window.localStorage.setItem('_profileAccessToken', _profileAccessToken);

                        document.querySelector("#firebaseui-auth-container div").setAttribute("style", "display:block");

                        setTimeout(() => {

                            document.querySelector('#profileBackground').remove();
                            document.querySelector('#profilePhoto').remove();
                            document.querySelector('#disconnectLink').remove();
                            document.querySelector('#profileDisplayName').remove();
                            document.querySelector('#profileEmail').remove();

                            ui.start('#firebaseui-auth-container', uiConfig);
                            document.querySelector("#firebaseui-auth-container div").setAttribute("style", "display:none");

                        }, 2000);

                        setTimeout(() => {
                            localStorage.clear();
                            location.href = '/';
                        }, 3000);


                    }).catch((error) => {
                        // An error happened.
                        console.log("sign-out-error" + error);
                    });

                }

            });

        });

    }

}