export default class DatePicker {

    elems_datepicker: NodeListOf<HTMLElement>;
    M: any;


    constructor(doc: Document, m:any) {
        this.elems_datepicker = doc.querySelectorAll('.datepicker');
        this.M = m;
    }

    init(): void {
        this.M.Datepicker.init(this.elems_datepicker, { autoClose: false, container: "p" });
    }

}