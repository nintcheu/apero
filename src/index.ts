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



import App from './app';
import Auth from './auth';


document.addEventListener('DOMContentLoaded', (e) => {

    let nav = new NavBar(document);
    nav.init();

    let TooltipElements = new Tooltip(document);
    TooltipElements.init();

    let selectElements = new Select(document);
    selectElements.init();

    let tabElements = new Tab(document);
    tabElements.init();

    let modalElements = new Modal(document);
    modalElements.init();

    let carouselElements = new Carousel(document);
    carouselElements.init();

    let datePickerElements = new DatePicker(document);
    datePickerElements.init();

    let chipElements = new Chip(document);
    chipElements.init();

    let floatMenuBtn = new FloatingBtnMenu(document);
    floatMenuBtn.init();
    floatMenuBtn.addListener();

    let aperoApp = new App();
    aperoApp.init();

    let auth = new Auth();
    auth.init();

    const form = document.querySelector('form')!;

    console.log("form: " + form);

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