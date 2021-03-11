export default class Select {

    elems_select: NodeListOf<HTMLElement>;
    M: any;


    constructor(doc: Document, m:any) {
        this.elems_select = doc.querySelectorAll('select');
        this.M = m;
    }

    init(): void {
        this.M.FormSelect.init(this.elems_select, {});
    }

}