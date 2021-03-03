export default class Tooltip {

    elems_tooltip: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_tooltip = doc.querySelectorAll('.tooltipped');
    }

    init(): void {
        M.Tooltip.init(this.elems_tooltip, {});
    }


}