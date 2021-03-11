export default class Modal {

    elems_modal: NodeListOf<HTMLElement>;
    currentModal: HTMLElement | undefined;
    M: any;


    constructor(doc: Document,  m:any) {
        this.elems_modal = doc.querySelectorAll('.modal');
        this.currentModal = undefined;
        this.M = m;
    }

    getCurrentModal(): HTMLElement | undefined {
        return this.currentModal;
    }

    getCurrentModalID(): string | null {
        return ((this.getCurrentModal() as HTMLElement)).getAttribute('id');
    }

    setCurrentModal(m: HTMLElement): void {
        this.currentModal = m;
    }


    init(): void {

        let options_modal = {};

        options_modal.onOpenStart = (modal: HTMLHtmlElement) => {
            if(modal){
                this.currentModal = modal;
                //console.log("openStart " + currentModalID);
            }
          
        };

        options_modal.onOpenEnd = (modal: HTMLHtmlElement) => {
            if (modal) {
                this.currentModal = modal;
                //console.log("openEnd " + currentModalID);
            }

        };

        options_modal.onCloseStart = (modal: HTMLHtmlElement) => {

            if (modal) {
                this.currentModal = modal;
            //console.log("closeStart " + modal.getAttribute('id'));
        }

        };

        options_modal.onCloseEnd = (modal: HTMLHtmlElement) => {
            if (modal) {
                this.currentModal = modal;
                //console.log("CloseEnd " + modal.getAttribute('id'));
            }
        };

       this.M.Modal.init(this.elems_modal, options_modal);
    }

}