export default class Modal {

    elems_modal: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_modal = doc.querySelectorAll('.modal');
    }

    init(): void {

        let currentModalID: string;
        let options_modal = {};

        options_modal.onOpenStart = (modal: HTMLHtmlElement) => {
            //currentModalID = modal.getAttribute('id')
            //console.log("openStart " + currentModalID);
        };

        options_modal.onOpenEnd = (modal: HTMLHtmlElement) => {
            if (modal) {

                //currentModalID = modal.getAttribute('id');
                //console.log("openEnd " + currentModalID);
            }

        };

        options_modal.onCloseStart = (modal: HTMLHtmlElement) => {
            //console.log("closeStart " + modal.getAttribute('id'));

        };

        options_modal.onCloseEnd = (modal: HTMLHtmlElement) => {
            if (modal) {
                //console.log("CloseEnd " + modal.getAttribute('id'));
            }
        };

       M.Modal.init(this.elems_modal, options_modal);
    }

}