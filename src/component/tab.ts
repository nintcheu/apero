export default class Tab {

    elems_tab: NodeListOf<HTMLElement>;

    constructor(doc: Document) {
        this.elems_tab = doc.querySelectorAll('.tabs');
    }

    init(): void {
        M.Tabs.init(this.elems_tab, {});
    }

}