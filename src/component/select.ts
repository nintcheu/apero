export default class Select {

    elems_select: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_select = doc.querySelectorAll('select');
    }

    init(): void {
        M.FormSelect.init(this.elems_select, {});
    }

}