export default class Tooltip {

    elems_tooltip: NodeListOf<HTMLElement>;
    M: any;


    constructor(doc: Document, m:any) {
        this.elems_tooltip = doc.querySelectorAll('.tooltipped');
        this.M = m;
    }

    init(): void {
        this.M.Tooltip.init(this.elems_tooltip, {});
    }


}