export default class DatePicker {

    elems_datepicker: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_datepicker = doc.querySelectorAll('.datepicker');
    }

    init(): void {
        M.Datepicker.init(this.elems_datepicker, { autoClose: false, container: "p" });
    }

}