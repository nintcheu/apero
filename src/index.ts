import { formData } from './forms';

document.addEventListener('DOMContentLoaded', (event) => {

    const form = document.querySelector('form')!;

    if (form) {

        form.addEventListener('submit', (e) => {

            e.preventDefault();
            const data = formData(form);
            console.log(data);

        });
    }








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


    M.textareaAutoResize(document.querySelector('#feedback-textarea'));

    M.Tabs.init(document.querySelectorAll('.tabs'), {});

    var elems_datepicker = document.querySelectorAll('.datepicker');
    var instances_datepicker = M.Datepicker.init(elems_datepicker, { autoClose: false, container: "p" });

    var elems_chips = document.querySelectorAll('.chips');

    let options_chips = {};
    options_chips.data = [];

    options_chips.placeholder = 'Contenu du plat';
    let instances_chips = M.Chips.init(elems_chips, options_chips);

    let elems_tooltipped = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems_tooltipped, {});





    // -- JS : MODAL FORM PUBLISHING DISH ---

    let elems_select = document.querySelectorAll('select');
    M.FormSelect.init(elems_select, {});

    let publishing_form_modal = document.getElementById('modal-publishing-form');
    let publishing_form_modal_options = {};
    publishing_form_modal_options.onOpenStart = () => { console.log("Avant de t'ouvrir, fait ceci! ") };
    publishing_form_modal_options.onOpenEnd = () => { console.log("Une fois ouvert, fait ceci! ") };
    publishing_form_modal_options.onCloseStart = () => { console.log("Avant de te fermer. Fait ceci!") };
    publishing_form_modal_options.onCloseEnd = () => { console.log("Une fois fermé, fait ceci!") };
    M.Modal.init(publishing_form_modal, publishing_form_modal_options);
    var publishing_form_modal_links = document.querySelectorAll('id.modal-publishing-from .modal-footer a');
    publishing_form_modal_links.forEach((href) => {
        href.addEventListener("click", (e) => {
            //console.log(e);
            console.log(e.target.firstChild.data);

        });

    });


    //------------ JS SEARCH MODAL - START

    var elems_search_form = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elems_search_form, {
        data: {
            "Noix": null,
            "arachides": null,
            "Oeufs": null,
            "Poissons": null,
            "Volaille": null,
            "Viande": null,
            "Bleuets": 'https://placehold.it/250x250',
            "saumon": 'https://placehold.it/250x250',
            "thon": 'https://placehold.it/250x250',
            "sole": 'https://placehold.it/250x250',
            "Arachides": null,
            "truite": null,
            "dinde": null,
            "agneau": null,
            "crabe": null,
            "homard": null,
            "crevettes": null,

        },
        minLength: 1,
        onAutocomplete: (txt) => {

            console.log("search-keyword: " + txt);


            var html = `<h4>Résultat: ${txt} </h4><ul class="collection">
  <li class="collection-item avatar">
    <img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle">
    <span class="title">Title</span>
    <p>First Line <br>
       Second Line
    </p>
    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
  </li>
  <li class="collection-item avatar">
    <i class="material-icons circle">folder</i>
    <span class="title">Title</span>
    <p>First Line <br>
       Second Line
    </p>
    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
  </li>
  <li class="collection-item avatar">
    <i class="material-icons circle green">insert_chart</i>
    <span class="title">Title</span>
    <p>First Line <br>
       Second Line
    </p>
    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
  </li>
  <li class="collection-item avatar">
    <i class="material-icons circle red">play_arrow</i>
    <span class="title">Title</span>
    <p>First Line <br>
       Second Line
    </p>
    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
  </li>
</ul>`;
            var result = document.getElementById("search-result");
            result.innerHTML = html;

            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        },
    });

    //----------- SEARCH MODAL - END

    // -- Caroussel --

    var elems_carousel = document.querySelectorAll('.carousel');
    var elems_carousel_options = {};
    M.Carousel.init(elems_carousel, elems_carousel_options);


    var elems_fixed_btn = document.querySelectorAll('.fixed-action-btn');
    var options_elems_fixed_btn = {};
    var instances = M.FloatingActionButton.init(elems_fixed_btn, options_elems_fixed_btn);

    var elems_fixed_btn_actions = document.querySelectorAll('.fixed-action-btn li a i');
    elems_fixed_btn_actions.forEach((href) => {
        href.addEventListener("click", (e) => {

            console.log("_profileAccessToken: " + window.localStorage.getItem('_profileAccessToken'));
            //console.log(e);
            console.log("btnClicked: " + e.target.firstChild.data);

        });

    });


    // firebase auth 

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                if (authResult.credential) {

                    _profileAccessToken = authResult.credential.accessToken;
                    window.localStorage.setItem('_profileAccessToken', _profileAccessToken);

                    //console.log(authResult.credential.accessToken);

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

                }

                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return false;
            },

        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
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
            }

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





    //MODAL CONTROLLER MANAGER : START

    var elems_modal = document.querySelectorAll('.modal');
    var options_modal = {};
    let currentModalID = null;


    options_modal.onOpenStart = (modal) => {
        //currentModalID = modal.getAttribute('id')
        //console.log("openStart " + currentModalID);
    };

    options_modal.onOpenEnd = (modal) => {
        currentModalID = modal.getAttribute('id')
        console.log("openEnd " + currentModalID);
    };

    options_modal.onCloseStart = (modal) => {
        //console.log("closeStart " + modal.getAttribute('id'));

    };

    options_modal.onCloseEnd = (modal) => {
        console.log("CloseEnd " + modal.getAttribute('id'));

    };
    //options_modal.startingTop = "2%";
    //options_modal.endingTop = "5%";


    var instances_modal = M.Modal.init(elems_modal, options_modal);
    var modal_elems_links = document.querySelectorAll('.modal .modal-footer a');
    modal_elems_links.forEach((href) => {

        href.addEventListener("click", (e) => {
            let modalID = href.parentNode.parentNode.getAttribute("id");
            let valueBtnClicked = e.target.firstChild.data;

            console.log("modalID: " + modalID + ", valueBtnClicked: " + valueBtnClicked);
            //console.log("_accessToken: " + _profileAccessToken);

            if (currentModalID == "modal-disconnect" && valueBtnClicked == "OUI") {

                firebase.auth().signOut().then((e) => {

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
    //MODAL CONTROLLER MANAGER : END












});



