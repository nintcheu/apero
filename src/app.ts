
export default class App {
  pwaSupport: boolean = false;
  M: any;

  constructor(pwa: boolean, M: any) {
    this.pwaSupport = pwa;
    this.M = M;
  }

  displayNotification(): void {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg: any) {
        var options = {
          body: 'Here is a notification body!',
          icon: 'images/example.png',
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

  init(): void {


    this.M.textareaAutoResize(document.querySelector('#feedback-textarea'));


    // -- JS : MODAL FORM PUBLISHING DISH ---



    let publishing_form_modal = document.getElementById('modal-publishing-form');
    let publishing_form_modal_options = {};
    publishing_form_modal_options.onOpenStart = () => { console.log("Avant de t'ouvrir, fait ceci! ") };
    publishing_form_modal_options.onOpenEnd = () => { console.log("Une fois ouvert, fait ceci! ") };
    publishing_form_modal_options.onCloseStart = () => { console.log("Avant de te fermer. Fait ceci!") };
    publishing_form_modal_options.onCloseEnd = () => { console.log("Une fois fermé, fait ceci!") };

    this.M.Modal.init(publishing_form_modal, publishing_form_modal_options);
    var publishing_form_modal_links = document.querySelectorAll('id.modal-publishing-from .modal-footer a');
    publishing_form_modal_links.forEach((href) => {
      href.addEventListener("click", (e) => {
        //console.log(e);
        //console.log(e.target.firstChild.data);

      });

    });


    //------------ JS SEARCH MODAL - START

    var elems_search_form = document.querySelectorAll('.autocomplete');
    this.M.Autocomplete.init(elems_search_form, {
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

        // console.log("search-keyword: " + txt);


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
        let result = document.getElementById("search-result") as HTMLElement;
        result.innerHTML = html;

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

      },
    });

    //----------- SEARCH MODAL - END









    //MODAL CONTROLLER MANAGER : START

    /*
        var modal_elems_links = document.querySelectorAll('.modal .modal-footer a');
        modal_elems_links.forEach((href) => {

            href.addEventListener("click", (e) => {
                let modalID = href.parentNode.parentNode.getAttribute("id");
                let valueBtnClicked = e.target.firstChild.data;

                console.log("modalID: " + modalID + ", valueBtnClicked: " + valueBtnClicked);
                console.log("_accessToken: " + _profileAccessToken);

                if (currentModalID == "modal-disconnect" && valueBtnClicked == "OUI") {

        

                }

            });

        });

        */
    //MODAL CONTROLLER MANAGER : END




  }

  initInstallFeature(): void {
    let installEvt: Event;

    window.onload = () => {

      let noAppInstallBtn = document.getElementById('noAppInstallBtn') as HTMLElement;

      if (noAppInstallBtn) {
        noAppInstallBtn.addEventListener('click', () => {
          console.log("clicked on noAppInstall");
          this.hidePrompt()
        });
      }

      let yesAppInstallBtn = document.getElementById('yesAppInstallBtn') as HTMLElement;
      if (yesAppInstallBtn) {
        yesAppInstallBtn.addEventListener('click', () => {
          console.log("clicked on yesAppInstall");
          this.installApp(installEvt);
        });
      }

      let instructionBtn = document.getElementById('instructionsCloseBtn') as HTMLElement;

      if (instructionBtn) {
        instructionBtn.addEventListener('click', () => {
          console.log("clicked on instructionBtn");
          this.hideInstructions();
        });
      }
      console.log("platform ", navigator.platform);
      console.log("pwaSupport ", this.pwaSupport);

      console.log("navigator ", navigator);

      if (this.pwaSupport) {
        let p = navigator.platform;
        if (p === 'iPhone' || p === 'iPad' || p === 'iPod') {
          if (!navigator.standalone) {
            let lastShow: number = parseInt(localStorage.getItem('lastShow'));
            let now: number = new Date().getTime();

            if (isNaN(lastShow) || (lastShow + 1000 * 60 * 24 * 7) <= now) {
              let instBtn = document.getElementById('instructions') as HTMLElement;
              instBtn.style.display = 'block';
              localStorage.setItem('lastShow', now.toString());

            }
          }
        }
      }
    };

    window.addEventListener('beforeinstallprompt', (evt) => {
      console.log("Before Install Prompt");
      installEvt = evt;
      evt.preventDefault();
      let addToHome = document.getElementById('addToHomeScreen') as HTMLElement;
      addToHome.style.display = 'block'
    });

    window.addEventListener('appinstalled', (evt) => {
      console.log(" app installed event");
    });


  }

  installApp(installEvt: Event): void {
    this.hidePrompt();
    installEvt.prompt();
    installEvt.userChoice.then((result) => {

      if (result.outcome === 'accepted') {
        console.log(" App Installed ");
      } else {
        console.log(" App not installed ");
      }

    });
  }

  hidePrompt(): void {
    let addToHome = document.getElementById('addToHomeScreen') as HTMLElement;
    addToHome.style.display = 'none';

  }


  hideInstructions(): void {
    let instBtn = document.getElementById('instructions') as HTMLElement;
    instBtn.style.display = 'none';
  }


}









