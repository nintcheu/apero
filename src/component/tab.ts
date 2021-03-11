export default class Tab {

    elems_tab: NodeListOf<HTMLElement>;
    M: any;


    constructor(doc: Document,  m: any) {
        this.elems_tab = doc.querySelectorAll('.tabs');
        this.M = m;
    }

    init(): void {
        this.M.Tabs.init(this.elems_tab, {});
    }

}