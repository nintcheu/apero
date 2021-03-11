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



import App from './app';
import Auth from './auth';
import SW from './service/sw';



document.addEventListener('DOMContentLoaded', (e) => {

    window.onhashchange =  function(){
        console.log("onhashchange");
        //Header is fixed, need to slide down some to see sectionHead
        setTimeout('scrollBy(0, -110)', 10);
    }

    let aperoSW = new SW();
    aperoSW.init();

    let nav = new NavBar(document, M);
    nav.init();

    let TooltipElements = new Tooltip(document, M);
    TooltipElements.init();

    let selectElements = new Select(document, M);
    selectElements.init();

    let tabElements = new Tab(document, M);
    tabElements.init();

    let modalElements = new Modal(document,  M);
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

    let aperoApp = new App(aperoSW.isPwaSupported(), M);
    aperoApp.init();
    aperoApp.initInstallFeature();

    let auth = new Auth(modalElements.getCurrentModal() as HTMLElement);
    auth.init();

    const form = document.querySelector('form')!;

    //console.log("form: " + form);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            const data = formData.getKeyValues();
            console.log("***********");
            console.log(data);

        });
    }



});